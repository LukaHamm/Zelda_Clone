import { Entity } from "./Entity.js";

class TreeEntity extends Entity {
    constructor(x,y,width,height,id){
        const hitboxFront = {
            x: x +width/4,
            y: y + height/5,
            width:width/2,
            height: height/2
        }

        const hitboxBack = {
            x: x+width/4,
            y: y+height*4/5,
            width: width/2,
            height: height/5
        }
        super(x,y,height,width, hitboxFront,hitboxBack,id);
        this.image = document.getElementById("tree");
    }

    update(){

    }

    draw(ctx,offsetx,offsetY){
        ctx.drawImage(this.image,0,0,957,896,this.x+offsetx,this.y+offsetY,this.width,this.height);
    }
    
}

export{TreeEntity}