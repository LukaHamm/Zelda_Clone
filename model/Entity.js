class Entity {
    static EnityID;


    
    constructor(x,y, heigt,width,hitboxFront, hitboxBack){
        this.x=x;
        this.y=y;
        this.width = width;
        this.heigt = heigt;
        this.hitboxFront=hitboxFront;
        this.hitboxBack=hitboxBack
        this.layer;
        this.inFrame = false;
    }

    updateHitbox(dx,dy){
        this.hitboxFront.x +=dx;
        this.hitboxBack.x +=dx;
        this.hitboxFront.y += dy;
        this.hitboxBack.y += dy;

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