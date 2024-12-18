import { Entity } from "./Entity.js";
import { SpriteAnimation } from "./SpriteAnimation.js";
import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import {Control} from "./Control.js"
import { Background } from "./Background.js";
import { ChunkLoader } from "./ChunkLoaader.js";
import {Chunk} from "./Chunk.js"
import { ChunkRenderer } from "./ChunkRenderer.js";

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
        chunkLoader.loadChunk("00",1300,700).then(chunk =>{
        function animate(timeStamp){
            const deltaTime = timeStamp -lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            //player.draw(ctx);
            //ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
            background.update(input)
            background.draw(ctx,input)
            chunkRenderer.draw(chunk,ctx);
            control.changeState(player)
            control.state.animation.drawSprite(ctx);
            //player.update();
            control.playerAction(player,deltaTime)
            if (!gameOver)requestAnimationFrame(animate);
        }   
        animate(0);
    })
    
    })

