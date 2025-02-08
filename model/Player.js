import { Entity } from "./Entity.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";

class Player extends Entity{
    constructor(gameWidth, gameHeight){
        const hitboxFront = {
            x: 0,
            y: gameHeight-200,
            width:200,
            height: 200
        }

        const hitboxBack = {
            x: 0,
            y: gameHeight-200,
            width:200,
            height: 200
        }
        super(0, gameHeight-200,200,200,hitboxFront,hitboxBack);
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.speed = 0;
        this.vy = 0;
    }

    updatePlayerHitBox(){
        if(this.x +this.speed >= 0 && this.x + this.width +this.speed <= this.gameWidth && this.y > 0){
            this.updateHitbox(this.speed,this.vy);
        }
        if(this.y < 0){
            this.hitboxFront.y=0;
            this.hitboxBack.y =0;
        }
    }

    
}
export {Player}

