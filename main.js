import { Entity } from "./Entity.js";
import { SpriteAnimation } from "./SpriteAnimation.js";
import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";


window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1')
    const ctx = canvas.getContext("2d");
    canvas.width= 1300;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    const input = new InputHandler();
    const player = new Player(canvas.width,canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.draw(ctx);
        player.update(input,deltaTime, enemies);
        if (!gameOver)requestAnimationFrame(animate);
    }   
    animate(0);




})