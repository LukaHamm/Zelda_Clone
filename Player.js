import { Entity } from "./Entity.js";
import { SpriteAnimation } from "./SpriteAnimation.js";

class Player extends Entity{
    constructor(gameWidth, gameHeight){
        super(0, gameHeight-200,200,200);
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.width = 200;
        this.heigt = 200;
        this.x = gameWidth/2 - this.heigt/2,
        this.y = this.gameHeight/2-this.heigt/2;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.walkAnimation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,this.x,this.y,this.width,this.heigt);
    }

}
export {Player}

