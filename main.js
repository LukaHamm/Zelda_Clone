import { Player } from "./model/Player.js";
import { InputHandler } from "./controls/InputHandler.js";
import {Control} from "./controls/Control.js"
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
        const rootChunk = "0000100005"
    
        const backgroundImage = document.getElementById("background");
        const background = new Background(document.getElementById("background"),0.5,canvas.width,canvas.height); 
        const input = new InputHandler();
        const player = new Player(canvas.width,canvas.height);
        const control = new Control(player, input)
        const chunkLoader = new ChunkLoader();
        const chunkRenderer = new ChunkRenderer();
        const layer = new Layer();
        let lastTime = 0;
        

        
        
        chunkLoader.loadChunk(rootChunk,canvas.width,canvas.height).then(chunk =>{
        const chunks = [];
        for(let i = 0;i<9;i++){
            let kopie = Chunk.copyChunk(chunk);
            chunks.push(kopie);
        }

        chunks[1].setOffsetX(-canvas.width);
        chunks[2].setOffsetX(canvas.width);
        chunks[3].setOffsetY(-canvas.height);
        chunks[4].setOffsetY(canvas.height);
        chunks[5].setOffsetX(-canvas.width);
        chunks[5].setOffsetY(canvas.height);
        chunks[6].setOffsetY(-canvas.height);
        chunks[6].setOffsetX(-canvas.width);
        chunks[7].setOffsetY(-canvas.height);
        chunks[7].setOffsetX(canvas.width);
        chunks[8].setOffsetY(canvas.height);
        chunks[8].setOffsetX(canvas.width);

        chunks[0].updateEntityHitbox();
        chunks[1].updateEntityHitbox();
        chunks[2].updateEntityHitbox();
        chunks[3].updateEntityHitbox();
        chunks[4].updateEntityHitbox();
        chunks[5].updateEntityHitbox();
        chunks[6].updateEntityHitbox();
        chunks[7].updateEntityHitbox();
        chunks[8].updateEntityHitbox();


        
        
        function animate(timeStamp){
            const deltaTime = timeStamp -lastTime;
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
                chunkRenderer.scroll(chunkCopy,input);
            })
        }
            chunks.forEach(chunkCopy =>{
                chunkRenderer.draw(chunkCopy,ctx);
            })
            control.prepareAction(player);
            control.changeState(player)
            //control.state.animation.drawSprite(ctx);
            layer.renderOrder(chunks,player)
            chunkRenderer.drawEntittiesDynamic(chunks,ctx,control);
            const hitboxPlayer = player.getHitBox();
            ctx.strokeRect(hitboxPlayer.x, hitboxPlayer.y, hitboxPlayer.width, hitboxPlayer.height);

            //player.update();
            
            
            if(!isHit) control.playerAction(player,deltaTime)
            if (!gameOver)requestAnimationFrame(animate);
        }   
        animate(0);
    })
    
    })

