import { Entity } from "./Entity.js";
class Enemy extends Entity{
    constructor(x,y,width,height){
        const hitboxFront = {
            x: x +width/3,
            y: y +height/3,
            width:width/4,
            height: height/4
        }

        const hitboxBack = {
            x: x +width/3,
            y: y +height/3,
            width:width/4,
            height: height/4
        }
        super(x,y,height,width, hitboxFront,hitboxBack);
        /*this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;*/
        this.speed = 0;
        this.vy = 0;
        this.image = document.getElementById("enemy");
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

    draw(ctx,offsetx,offsetY){
        ctx.drawImage(this.image,0,0,1024,1024,this.x+offsetx,this.y+offsetY,this.width,this.heigt);
        ctx.strokeRect(this.hitboxBack.x+offsetx,this.hitboxBack.y+offsetY,this.hitboxBack.width,this.hitboxBack.height)
        
    }

}

export {Enemy}