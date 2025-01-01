import { Entity } from "./Entity.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";

class Player extends Entity{
    constructor(gameWidth, gameHeight){
        super(0, gameHeight-200,200,200,0,gameHeight,200,200);
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.speed = 0;
        this.vy = 0;
    }

    
}
export {Player}

