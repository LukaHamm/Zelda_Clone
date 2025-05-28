class Entity {
    static EnityID;


    
    constructor(x,y, heigt,width,hitboxFront, hitboxBack, id){
        this.x=x;
        this.y=y;
        this.width = width;
        this.heigt = heigt;
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



    getHitBox(){
        if(this.layer == 2){
            return this.hitboxBack;
        }else{
            return this.hitboxFront;
        }
    }
 
}

export {Entity}