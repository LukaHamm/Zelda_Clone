import { Entity } from "./Entity.js";

class TreeEntity extends Entity {
    constructor(x,y,width,height){
        super(x,y,height,width);
        this.image = document.getElementById("tree");
    }

    update(){

    }

    draw(ctx,offsetx,offsetY){
        ctx.drawImage(this.image,0,0,957,896,this.x+offsetx,this.y+offsetY,this.width,this.heigt);
    }
    
}

export{TreeEntity}