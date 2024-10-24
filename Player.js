import { Entity } from "./Entity.js";
import { SpriteAnimation } from "./SpriteAnimation.js";

class Player extends Entity{
    constructor(gameWidth, gameHeight){
        super(0, gameHeight-200,200,200);
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.width = 200;
        this.heigt = 200;
        this.x = 0,
        this.y = this.gameHeight-this.heigt;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.walkAnimation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,this.x,this.y,this.width,this.heigt);
    }

    restart(){
        this.x=100;
        this.y = this.gameHeight-this.heigt;
        this.maxFrame=7;
        this.frameY=1;
    }

    draw(context){
        context.strokeStyle = "white"
        context.strokeRect(this.x,this.y,this.width,this.heigt);
        context.beginPath();
        context.arc(this.x + this.width/2,this.y + this.heigt/2,this.width/2,0,Math.PI*2)
        context.stroke();
        context.fillStyle = 'white';
        this.walkAnimation.drawSprite(context);
    }

    update(input, deltaTime){
        if(input.keys.indexOf("ArrowLeft") > -1 
        || input.keys.indexOf("ArrowRight") > -1 || input.keys.indexOf("ArrowDown") >-1 || input.keys.indexOf("ArrowUp") >-1){
            this.walkAnimation.updateSprite(deltaTime);
        }

        //controls
        if(input.keys.indexOf("ArrowRight") > -1){
            this.speed=5;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY= 1;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            this.speed=-5
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 0;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            this.vy=5
            this.speed=0;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 2;
        }else if(input.keys.indexOf("ArrowUp") >-1){
            this.vy=-5;
            this.speed=0;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 3;
        }else {
            this.speed=0;
            this.vy = 0;
        }
        // horizontal movement
        this.x += this.speed;
        this.walkAnimation.x +=this.speed;
        if(this.x < 0){ 
            this.x = 0;
            this.walkAnimation.x = 0;
        }
        if(this.x + this.width > this.gameWidth){
            this.x = this.gameWidth-this.width;
            this.walkAnimation.x = this.gameWidth-this.width;
        }

        //vertical movement
        this.y += this.vy;
        this.walkAnimation.y += this.vy
        if(this.y > this.gameHeight -this.heigt){
             this.y = this.gameHeight -this.heigt;
             this.walkAnimation.y = this.gameHeight -this.heigt
        }
        if(this.y < 0){
            this.y=0;
            this.walkAnimation.y = 0;    
        }
    }

    onGround(){
        return this.y >= this.gameHeight -this.heigt;
    }

}
export {Player}

