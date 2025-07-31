class Entity {
    static EnityID;


    
    constructor(x,y, height,width,hitboxFront, hitboxBack, id){
        this.x=x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.hitboxFront=hitboxFront;
        this.hitboxBack=hitboxBack
        this.layer;
        this.inFrame = false;
        this.isHit=false
        this.id = id;
    }

    updateHitbox(newx,newy){
        this.hitboxFront.update(newx,newy)
        this.hitboxBack.update(newx,newy);

    }

    update (){
        
    }

    draw(){
        
    }



    getHitBox(player){
        if(this.layer< player.layer){
            return this.hitboxBack;
        }else{
            return this.hitboxFront;
        }
    }
 
}

export {Entity}