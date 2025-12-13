import { Player } from "./model/Player.js";
import { InputHandler } from "./controls/InputHandler.js";
import { Attack, Control, Idle, Walk, Invisiblity } from "./controls/Control.js"
import { Background } from "./renderer/Background.js";
import { ChunkLoader } from "./data/ChunkLoaader.js";
import { Chunk } from "./model/Chunk.js";
import { MovementPattern } from "./controls/MovementPattern.js";
import { ChunkRenderer } from "./renderer/ChunkRenderer.js";
import { Layer } from "./renderer/Layer.js";
import { CollisionDetector } from "./data/CollisionDetector.js";
import { Enemy } from "./model/Enemy.js";
import { WalkingState } from "./controls/WalkingState.js";
import { IdleState } from "./controls/IdleState.js";
import { EnemyManager } from "./controls/EnemyManager.js";


window.addEventListener('load', function () {
    const canvas = this.document.getElementById('canvas1')
    const ctx = canvas.getContext("2d");
    canvas.width = 1300;
    canvas.height = 720;
    let gameOver = false;
    let rootChunkId = "5000050000"

    const backgroundImage = document.getElementById("background");
    const background = new Background(document.getElementById("background"), 0.5, canvas.width, canvas.height);
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const control = new Control(player, input)
    const chunkLoader = new ChunkLoader();
    const chunkRenderer = new ChunkRenderer();
    const layer = new Layer();
    const enemyManager = new EnemyManager();
    let enemyXOld = 0;
    let enemyYOld = 0;
    let triggerUpdateDelay=2000;
    let lastTimeWalkTriggered=0;


    function determineNextRootChunk(rootChunk, chunks) {
        const chunkRow = parseInt(rootChunk.chunkid.substring(0, 5));
        const chunkColumn = parseInt(rootChunk.chunkid.substring(5, rootChunk.chunkid.length));
        let chunkId = rootChunk.chunkid;
        const maxWidth = Math.floor(canvas.width / (ChunkRenderer.iteration * rootChunk.speedmodifier)) * (ChunkRenderer.iteration * rootChunk.speedmodifier)
        if (rootChunk.offsetx == maxWidth) {
            let newChunkColumn = chunkColumn - 1;
            chunkId = chunkRow.toString() + newChunkColumn.toString()
        }
        if (rootChunk.offsetx == -maxWidth) {
            let newChunkColumn = chunkColumn + 1;
            chunkId = chunkRow.toString() + newChunkColumn.toString();
        }
        if (rootChunk.offsetY == -canvas.height) {
            let newChunkRow = chunkRow - 1;
            chunkId = newChunkRow.toString() + chunkColumn.toString();
        }
        if (rootChunk.offsetY == canvas.height) {
            let newChunkRow = chunkRow + 1;
            chunkId = newChunkRow.toString() + chunkColumn.toString();
        }
        let newRootChunk = chunks.find(chunk => chunk.chunkid === chunkId);
        if (rootChunk.chunkid === newRootChunk.chunkid) {
            return null;
        }
        return newRootChunk;
    }



    chunkLoader.preLoad(rootChunkId, canvas.width, canvas.height).then(chunks => {
        async function animate(timeStamp) {
            let rootChunk = chunks.find(chunk => chunk.chunkid === rootChunkId);
            player.isHit = false;
            player.isHitByEnemy = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background.update(input)
            background.draw(ctx, input)
            rootChunk.updateEntityHitbox();
            layer.renderOrder(chunks, player, rootChunk)

            chunks.forEach(chunkCopy => {
                chunkCopy.entityArray.forEach(entity => {
                    if(entity instanceof Enemy){
                        enemyManager.add(entity);
                    }
                })
            })
            enemyManager.entities.forEach(enemy => {
                let hasEnemy = false;
                chunks.forEach(chunkCopy => {
                    chunkCopy.entityArray.forEach(entity => {
                        if(enemy.id === entity.id){
                            hasEnemy=true;
                        }
                    })
                })
                if(!hasEnemy){
                    enemyManager.remove(enemy);
                }
            })
            
            chunks.forEach(chunkCopy => {
                chunkCopy.entityArray.forEach(enity => {
                    //TODO aufpassen dass default wert nicht überschrieben wird, updaten der hitbox location
                    if (!player.isHit) {
                        if (enity.inFrame) {
                            player.isHit = CollisionDetector.isCollision(chunkCopy, enity.getHitBox(player), player)
                            if (enity instanceof Enemy && !player.isHitByEnemy) {
                                player.isHitByEnemy = (control.state instanceof Invisiblity) ? false : player.isHit;
                                player.isHit=false;
                                
                                let dx = enity.x - enemyXOld;
                                let dy = enity.y -enemyYOld;

                                /*if(timeStamp - lastTimeWalkTriggered > triggerUpdateDelay){
                                    dx = Math.round(Math.random());;
                                    dy = Math.round(Math.random());;
                                    lastTimeWalkTriggered = timeStamp;
                                }
                                //let dx = 0;
                                //let dy = 0;
                                enemyXOld = enity.x;
                                enemyYOld = enity.y;
                                const triggerContextMap = new Map([
                                            ['dx', dx],
                                            ['dy', dy]
                                            ]);
                                let oldstate = enity.stateMachine.state;
                                if(timeStamp - lastTimeWalkTriggered > triggerUpdateDelay){
                                    dx = 1;
                                    dy = 0;
                                    if(enity.stateMachine.state instanceof IdleState){
                                        triggerContextMap.set('dx',dx);
                                        triggerContextMap.set('dy',dy);
                                        triggerContextMap.set('bool', enity.stateMachine.state.movementPattern.leaveIdle)
                                    }
                                    lastTimeWalkTriggered = timeStamp;
                                    enity.stateMachine.changeState(triggerContextMap)
                                }
                                //TODO Es wird zu oft upgedatet!
                                if(oldstate != enity.stateMachine.state){
                                   enity.stateMachine.state.entry() 
                                }
                                enity.stateMachine.enmeyAction(timeStamp,ctx)
                                //enity.getMovementPattern().update(timeStamp);*/
                            }
                            


                        }
                    }

                })
            })

            enemyManager.manage(chunks,rootChunk,timeStamp,player)
            /*enemyManager.changeEnemyStates(chunks,rootChunk,timeStamp);
            enemyManager.entryState();
            enemyManager.enemyAction(timeStamp);
            enemyManager.saveEnemyStates()*/
            if (!player.isHit) {
                chunks.forEach(chunkCopy => {
                    if (control.state instanceof Walk) {
                        chunkRenderer.scroll(chunkCopy, input);
                    }
                })
            }
            chunks.forEach(chunkCopy => {
                chunkRenderer.draw(chunkCopy, ctx);
            })
            control.prepareAction(player);
            control.changeState(player, timeStamp)
            //control.state.animation.drawSprite(ctx);
            ctx.strokeRect(player.hitboxBack.x, player.hitboxBack.y, player.hitboxBack.width, player.hitboxBack.height)
            ctx.strokeRect(player.attackboxRight.x, player.attackboxRight.y, player.attackboxRight.width, player.attackboxRight.height)
            ctx.strokeRect(player.attackboxLeft.x, player.attackboxLeft.y, player.attackboxLeft.width, player.attackboxLeft.height)
            ctx.strokeRect(player.attackboxFront.x, player.attackboxFront.y, player.attackboxFront.width, player.attackboxFront.height)
            ctx.strokeRect(player.attackboxBack.x, player.attackboxBack.y, player.attackboxBack.width, player.attackboxBack.height)
            chunkRenderer.drawEntittiesDynamic(chunks, ctx, control, player);
            const hitboxPlayer = player.getHitBox(player);
            if (rootChunk !== undefined) {
                let newRootChunk = determineNextRootChunk(rootChunk, chunks);
                if (newRootChunk != null) {
                    let newChunks = await chunkLoader.loadNext(chunks, newRootChunk.chunkid, canvas.width, canvas.height)
                    if (newChunks !== undefined && newChunks.length > 0) {
                        chunks = newChunks;
                        rootChunk = newRootChunk;
                        rootChunkId = newRootChunk.chunkid;
                    }
                }
            }
            //player.update();

            if (!player.isHit || player.isHitByEnemy) {
                control.playerAction(player, timeStamp)
                if (control.state instanceof Attack) {
                    chunks.forEach(chunkCopy => {
                        chunkCopy.entityArray.forEach(enity => {
                            player.isHit = CollisionDetector.isCollision(chunkCopy, enity.getHitBox(player), player)
                            if (control.state instanceof Attack) {
                                if (enity instanceof Enemy) {
                                    enity.isHit = CollisionDetector.isAttackHit(chunkCopy, enity.getHitBox(player), player.currentAttackBox, timeStamp);
                                    if (enity.isHit) {
                                        enity.decrementHealth();
                                        if(control.state.animation.frameY == 1){
                                            enity.knockback(-5,0)
                                        }else if (control.state.animation.frameY == 0){
                                            enity.knockback(5,0);
                                        }else if(control.state.animation.frameY == 3){
                                            enity.knockback(0,-5);
                                        }else if(control.state.animation.frameY == 2){
                                            enity.knockback(0,5);
                                        }
                                    }
                                    if (enity.health <= 0) {
                                        chunkCopy.removeEntity(enity);
                                    }
                                }

                            }

                        })
                    })
                }
                // mit liveserver nicht möglich
                //chunkLoader.storeChunk(rootChunk.chunkid,rootChunk,canvas.width,canvas.height);
            }
            if (!gameOver) requestAnimationFrame(animate);
        }
        animate(0);
    })

})

