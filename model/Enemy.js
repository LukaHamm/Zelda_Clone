import { Entity } from "./Entity.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
class Enemy extends Entity{
    static healthBarHeight = 20;
    constructor(x,y,width,height,id){
        const hitboxFront = {
            widthOrigin: width,
            heightOrigin: height,
            x: x +width/3,
            y: y +height/3,
            width:width/3,
            height: height/2,
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
            width:width/3,
            height: height/2,
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
        this.movementPattern = null;
        this.animation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,this.x,this.y,this.width,this.heigt)
        this.animationState = 'idle';
        this.hitPoints = 250;
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
        //ctx.drawImage(this.image,0,0,1024,1024,this.x+offsetx,this.y+offsetY,this.width,this.heigt);
        //ctx.strokeRect(this.hitboxBack.x+offsetx,this.hitboxBack.y+offsetY,this.hitboxBack.width,this.hitboxBack.height)
        this.animation.x = this.x+offsetx;
        this.animation.y = this.y+offsetY;
        this.animation.drawSprite(ctx);
        ctx.strokeRect(this.hitboxBack.x+offsetx,this.hitboxBack.y+offsetY,this.hitboxBack.width,this.hitboxBack.height)
        this.drawHealthBar(ctx,offsetx,offsetY);
        
    }

    decrementHealth(){
        this.hitPoints--;
        this.health = Math.ceil(this.hitPoints/50);

    }

    updateSprite(deltaTime){
        let direction = this.movementPattern.direction;
        if(this.animationState === 'moving'){
         switch (direction) {
            case 1: // Move up
                this.animation.maxFrame = 7;
                this.animation.frameY = 3;
                break;
            case 2: // Move down
                this.animation.maxFrame = 7;
                this.animation.frameY = 0;
                break;
            case 3: // Move left
                this.animation.maxFrame = 7;
                this.animation.frameY = 2;
                break;
            case 4: // Move right
                this.animation.maxFrame = 7;
                this.animation.frameY= 1;
                break;
        }
    }
        if(this.movementPattern.dy == 0 && this.movementPattern.dx == 0){
            if(this.animationState !== 'idle'){
                this.animation = new SpriteAnimation(1024,1024,0,0,5,'playerIdle',30,this.x,this.y,this.width,this.heigt)
                this.animationState = 'idle';
        }
        }else{
            if(this.animationState !== 'moving'){
            this.animationState = 'moving';
            this.animation = new SpriteAnimation(1024,1024,0,1,7,'enemyWalk',30,this.x,this.y,this.width,this.heigt);
            }
        }
        this.animation.updateSprite(deltaTime);
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
        //move right

        //move left

        //move up

        //move down

        //maxMovementRadius
        this.x -=this.speed;
        //this.y += Math.random()*5-2.5;
        this.y += this.curve*Math.sin(this.angle);
        this.updateHitbox(this.x,this.y);
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = 400;
    }

    setMovementPattern(movementPattern){
        this.movementPattern = movementPattern;
    }
    getMovementPattern(){
        return this.movementPattern;
    }

}

export {Enemy}