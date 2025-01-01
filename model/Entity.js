class Entity {
    static EnityID;

    static copyEntity(entitiy){
        return new Entity(entitiy.x,entitiy.y, entitiy.heigt,entitiy.width,entitiy.hitboxX,entitiy.hitboxY,entitiy.hitboxWidth,entitiy.hitboxHeight)
    }
    
    constructor(x,y, heigt,width,hitboxX,hitboxY,hitboxWidth,hitboxHeight){
        this.x=x;
        this.y=y;
        this.width = heigt;
        this.heigt = width;
        this.hitboxX=hitboxX;
        this.hitboxY=hitboxY
        this.hitboxWidth = hitboxWidth
        this.hitboxHeight = hitboxHeight
        this.layer;
    }

    update (){
        
    }

    draw(){
        
    }
 
}

export {Entity}