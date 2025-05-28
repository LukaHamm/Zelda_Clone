import { Entity } from "./Entity.js";
class Enemy extends Entity{
    static healthBarHeight = 20;
    constructor(x,y,width,height,id){
        const hitboxFront = {
            widthOrigin: width,
            heightOrigin: height,
            x: x +width/3,
            y: y +height/3,
            width:width/4,
            height: height/4,
            update(x,y){
                this.x=x +this.widthOrigin/3;
                this.y=y +this.heightOrigin/3;
            }
        }

        const hitboxBack = {
            widthOrigin: width,
            heightOrigin: height,
            x: x +width/3,
            y: y +height/3,
            width:width/4,
            height: height/4,
            update(x,y){
                this.x=x +this.widthOrigin/3;
                this.y=y +this.heightOrigin/3;
            }
        }
        super(x,y,height,width, hitboxFront,hitboxBack,id);
        /*this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;*/
        this.speed = 5;
        this.angle = Math.random()*2;
        this.angleSpeed = Math.random() *0.2;
        this.curve = Math.random()*7;
        this.vy = 0;
        this.image = document.getElementById("enemy");
        this.health=5;
        this.maxHealth = 5;
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
        this.drawHealthBar(ctx,offsetx,offsetY);
        
    }

    drawHealthBar(ctx,offsetx, offsetY){
        let healthBarFragmentWidth = this.width/this.maxHealth;
        for(let i = 0; i< this.maxHealth; i++ ){
            if(this.health < i){
                ctx.strokeStyle = 'red';
                ctx.strokeRect(this.x +offsetx + i*healthBarFragmentWidth,this.y +offsetY - Enemy.healthBarHeight,healthBarFragmentWidth,Enemy.healthBarHeight);
            }else{
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x +offsetx + i*healthBarFragmentWidth,this.y +offsetY - Enemy.healthBarHeight,healthBarFragmentWidth,Enemy.healthBarHeight);
            }

        }
    }

    move(){
        this.x -=this.speed;
        //this.y += Math.random()*5-2.5;
        this.y += this.curve*Math.sin(this.angle);
        this.updateHitbox(this.x,this.y);
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = 400;
    }

}

export {Enemy}