import { Entity } from "./Entity.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
import { Enemy } from "./Enemy.js";
import { WalkingState } from "../controls/WalkingState.js";
import { IdleState } from "../controls/IdleState.js";
class MushroomEnemy extends Enemy{
    static healthBarHeight = 20;
    constructor(x,y,width,height,id, statemachine){
        const hitboxFront = {
            widthOrigin: width,
            heightOrigin: height,
            x: x +width/3,
            y: y + height/5,
            width:width/3,
            height: height/3,
            update(x,y){
                this.x=x +this.widthOrigin/3;
                this.y=y +this.heightOrigin/5;
            }
        }

        const hitboxBack = {
            widthOrigin: width,
            heightOrigin: height,
            x: x +width/3,
            y: y + height/1.5,
            width:width/3,
            height: height/3,
            update(x,y){
                this.x=x +this.widthOrigin/3;
                this.y=y + this.heightOrigin/1.5;
            }
        }
        super(x,y,height,width,id,statemachine);
        /*this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;*/
        this.speed = 5;
        //this.image = document.getElementById("enemy");
        this.health=5;
        this.maxHealth = 5;
        this.movementPattern = null;
        this.animation = new SpriteAnimation(1024,1024,0,1,7,'enemyIdle',30,this.x,this.y,this.width,this.height)
        this.animationState = 'idle';
        this.hitPoints = 250;
        this.direction=1;
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

    draw(ctx,offsetx,offsetY,player){
        //ctx.drawImage(this.image,0,0,1024,1024,this.x+offsetx,this.y+offsetY,this.width,this.height);
        //ctx.strokeRect(this.hitboxBack.x+offsetx,this.hitboxBack.y+offsetY,this.hitboxBack.width,this.hitboxBack.height)
        this.animation.x = this.x+offsetx;
        this.animation.y = this.y+offsetY;
        this.animation.drawSprite(ctx);
        //ctx.strokeRect(this.getHitBox(player).x+offsetx,this.getHitBox(player).y+offsetY,this.getHitBox(player).width,this.getHitBox(player).height)
        this.drawHealthBar(ctx,offsetx,offsetY);
        
    }

    decrementHealth(){
        this.hitPoints--;
        this.health = Math.ceil(this.hitPoints/50);

    }

    updateSprite(deltaTime){
        this.stateMachine.enemyAction(deltaTime);
    }


    changeState(chunk){
        if(this.stateMachine.state instanceof WalkingState){
            this.stateMachine.setNextState(this.movementPattern);
        }else if (this.stateMachine.state instanceof IdleState){
            this.stateMachine.setNextState(this.movementPattern);
        }

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

    setMovementPattern(movementPattern){
        this.movementPattern = movementPattern;
    }
    getMovementPattern(){
        return this.movementPattern;
    }

}
export {MushroomEnemy}