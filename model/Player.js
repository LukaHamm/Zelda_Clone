import { Entity } from "./Entity.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";

class Player extends Entity{
    constructor(gameWidth, gameHeight){
        const hitboxFront = {
            x: 50,
            y: gameHeight-125,
            width:100,
            height: 100,
            update(x,y){
                this.x=x+50;
                this.y=y+75;
            }
        }

        const hitboxBack = {
            x: 50,
            y: gameHeight-125,
            width:100,
            height: 100,
            update(x,y){
                this.x=x+50;
                this.y=y +75;
            }
        }
        
        super(0, gameHeight-200,200,200,hitboxFront,hitboxBack);
        this.attackboxRight = {
            x: 0 + 150,
            y: gameHeight-100,
            width: 50,
            height: 20,
            update(x,y){
                this.x = x +150;
                this.y = y +100;
            },
            frameAttackMotion: 2,
            swingStep: 35,
            multiplyerBeginMotion: -1,
            multiplyerEndMotion: 1
        }
        this.attackboxLeft = {
            x: 0,
            y: gameHeight-100,
            width: 50,
            height: 20,
            update(x,y){
                this.x = x;
                this.y = y +100;
            },
            frameAttackMotion: 2,
            swingStep: 35,
            multiplyerBeginMotion: -1,
            multiplyerEndMotion: 1
        }

        this.attackboxFront = {
            x: 75,
            y: gameHeight-200,
            width: 50,
            height: 20,
            update(x,y){
                this.x = x +75;
                this.y = y;
            },
            frameAttackMotion: 2,
            swingStep: 10,
            multiplyerBeginMotion: -1,
            multiplyerEndMotion: 1

        }
        
        this.attackboxBack = {
            x: 75,
            y: gameHeight-20,
            width: 50,
            height: 20,
            update(x,y){
                this.x = x +75;
                this.y = y + 200 -20;
            },
            frameAttackMotion: 2,
            swingStep: 10,
            multiplyerBeginMotion: 1,
            multiplyerEndMotion: -1
        }

        this.currentAttackBox = this.attackboxLeft;
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.speed = 0;
        this.vy = 0;
        this.isHitByEnemy = false;
    }

    updatePlayerHitBox(){
        if(this.x +this.speed >= 0 && this.x + this.width +this.speed <= this.gameWidth && this.y + this.vy >= 0 && this.y + this.height + this.vy <= this.gameHeight){
            
        }
        this.updateHitbox(this.x,this.y);
    }

    updateAttackHitbox(x,y){
        this.currentAttackBox.update(x,y);
    }

    moveHitBox(dy){
        this.currentAttackBox.y +=dy;
    }

    getHitBox(){
        return this.hitboxBack;
        
    }

    
}
export {Player}

