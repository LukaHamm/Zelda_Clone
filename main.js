import { Player } from "./model/Player.js";
import { InputHandler } from "./controls/InputHandler.js";
import {Control} from "./controls/Control.js"
import { Background } from "./renderer/Background.js";
import { ChunkLoader } from "./data/ChunkLoaader.js";
import {Chunk} from "./model/Chunk.js"
import { ChunkRenderer } from "./renderer/ChunkRenderer.js";

    window.addEventListener('load', function(){
        const canvas = this.document.getElementById('canvas1')
        const ctx = canvas.getContext("2d");
        canvas.width= 1300;
        canvas.height = 720;
        let enemies = [];
        let score = 0;
        let gameOver = false;
    
    
        const backgroundImage = document.getElementById("background");
        const background = new Background(document.getElementById("background"),0.5,canvas.width,canvas.height); 
        const input = new InputHandler();
        const player = new Player(canvas.width,canvas.height);
        const control = new Control(player, input)
        const chunkLoader = new ChunkLoader();
        const chunkRenderer = new ChunkRenderer();
        let lastTime = 0;

        
        
        chunkLoader.loadChunk("00",canvas.width,canvas.height).then(chunk =>{
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


        
        function animate(timeStamp){
            const deltaTime = timeStamp -lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            //player.draw(ctx);
            //ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
            background.update(input)
            background.draw(ctx,input)
            chunks.forEach(chunkCopy => {
                chunkRenderer.scroll(chunkCopy,input);
            })
            chunks.forEach(chunkCopy =>{
                chunkRenderer.draw(chunkCopy,ctx);
            })
            control.changeState(player)
            control.state.animation.drawSprite(ctx);
            //player.update();
            control.playerAction(player,deltaTime)
            if (!gameOver)requestAnimationFrame(animate);
        }   
        animate(0);
    })
    
    })

