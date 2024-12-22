import { Entity } from "./Entity.js";

class TreeEntity extends Entity {
    constructor(x,y,width,height){
        super(x,y,height,width);
        this.image = document.getElementById("tree");
    }

    update(){

    }

    draw(ctx){
        ctx.drawImage(this.image,0,0,this.width,this.heigt,this.x,this.y,this.width,this.heigt);
    }
    
}

export{TreeEntity}