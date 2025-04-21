import { Player } from "./model/Player.js";
import { InputHandler } from "./controls/InputHandler.js";
import {Control, Idle, Walk} from "./controls/Control.js"
import { Background } from "./renderer/Background.js";
import { ChunkLoader } from "./data/ChunkLoaader.js";
import {Chunk} from "./model/Chunk.js"
import { ChunkRenderer } from "./renderer/ChunkRenderer.js";
import { Layer } from "./renderer/Layer.js";
import { CollisionDetector } from "./data/CollisionDetector.js";

    window.addEventListener('load', function(){
        const canvas = this.document.getElementById('canvas1')
        const ctx = canvas.getContext("2d");
        canvas.width= 1300;
        canvas.height = 720;
        let enemies = [];
        let score = 0;
        let gameOver = false;
        let rootChunkId = "5000050000"
    
        const backgroundImage = document.getElementById("background");
        const background = new Background(document.getElementById("background"),0.5,canvas.width,canvas.height); 
        const input = new InputHandler();
        const player = new Player(canvas.width,canvas.height);
        const control = new Control(player, input)
        const chunkLoader = new ChunkLoader();
        const chunkRenderer = new ChunkRenderer();
        const layer = new Layer();
        let lastTime = 0;
        
        function determineNextRootChunk(rootChunk,chunks){
            const chunkRow =  parseInt(rootChunk.chunkid.substring(0,5));
            const chunkColumn = parseInt(rootChunk.chunkid.substring(5,rootChunk.chunkid.length));
            let chunkId = rootChunk.chunkid;
            //Funktioniert nicht richtig für scroll in x-Richtung da iteration übersprungen wird
            const maxWidth = Math.floor(canvas.width /(ChunkRenderer.iteration*rootChunk.speedmodifier))*(ChunkRenderer.iteration*rootChunk.speedmodifier)
            if(rootChunk.offsetx == maxWidth){
                let newChunkColumn = chunkColumn -1;
                chunkId = chunkRow.toString() + newChunkColumn.toString()
            }
            if(rootChunk.offsetx == -maxWidth){
                let newChunkColumn = chunkColumn +1;
                chunkId = chunkRow.toString() + newChunkColumn.toString();
            }
            if(rootChunk.offsetY == -canvas.height){
                let newChunkRow = chunkRow -1;
                chunkId = newChunkRow.toString() + chunkColumn.toString();
            }
            if(rootChunk.offsetY == canvas.height){
                let newChunkRow = chunkRow +1;
                chunkId = newChunkRow.toString() + chunkColumn.toString();
            }
            let newRootChunk = chunks.find(chunk => chunk.chunkid === chunkId);
            if(rootChunk.chunkid === newRootChunk.chunkid){
                return null;
            }
            return newRootChunk;
        }
        
        
        chunkLoader.preLoad(rootChunkId,canvas.width,canvas.height).then(chunks =>{    
        async function animate(timeStamp){
            const deltaTime = timeStamp -lastTime;
            let rootChunk = chunks.find(chunk => chunk.chunkid === rootChunkId);
            let isHit = false;
            lastTime = timeStamp;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            background.update(input)
            background.draw(ctx,input)
           
            chunks.forEach(chunkCopy =>{
                chunkCopy.entityArray.forEach(enity =>{
                    //TODO aufpassen dass default wert nicht überschrieben wird, updaten der hitbox location
                    if(!isHit){
                        if(enity.inFrame){
                         isHit = CollisionDetector.isCollision(chunkCopy,enity.getHitBox(),player)
                        }
                    }
                    
                })
            })
            if(!isHit){
            chunks.forEach(chunkCopy => {
                if(control.state instanceof Walk){
                chunkRenderer.scroll(chunkCopy,input);
                }
            })
        }
            chunks.forEach(chunkCopy =>{
                chunkRenderer.draw(chunkCopy,ctx);
            })
            control.prepareAction(player);
            control.changeState(player)
            //control.state.animation.drawSprite(ctx);
            layer.renderOrder(chunks,player)
            ctx.strokeRect(player.hitboxBack.x,player.hitboxBack.y,player.hitboxBack.width,player.hitboxBack.height)
            chunkRenderer.drawEntittiesDynamic(chunks,ctx,control);
            const hitboxPlayer = player.getHitBox();
            if (rootChunk !== undefined){
            let newRootChunk = determineNextRootChunk(rootChunk,chunks);
            if(newRootChunk != null){
            let newChunks = await chunkLoader.loadNext(chunks,newRootChunk.chunkid,canvas.width,canvas.height)
            if(newChunks !== undefined && newChunks.length > 0){
                chunks = newChunks;
                rootChunk = newRootChunk;
                rootChunkId = newRootChunk.chunkid;
            }
            }
            }
            //player.update();
            
            
            if(!isHit){ 
                control.playerAction(player,deltaTime)
            }
            if (!gameOver)requestAnimationFrame(animate);
        }   
        animate(0);
    })
    
    })

