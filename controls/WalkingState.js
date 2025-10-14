import { EnemyState } from "./EnemyState.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
class WalkingState extends EnemyState{
    constructor(enemy, movementPattern, nextState, trigger){
        super(enemy, movementPattern, nextState, trigger);
        this.movementPattern=movementPattern;
         this.updateDelay = 1000 / 30;
         this.lastTime = 0;
         this.animation=new SpriteAnimation(1024,1024,0,1,7,'enemyWalk',30,this.enemy.x,this.enemy.y,this.enemy.width,this.enemy.height);
    }

    entry(){
        this.movementPattern.setEntity(this.enemy);
        this.enemy.animation =  this.animation;
    }

    prepareAction(){
        
    }

    enmeyAction(timestamp){
        this.movementPattern.update(timestamp);
        let direction = this.movementPattern.direction;
         switch (direction) {
            case 1: // Move up
                this.enemy.animation.maxFrame = 7;
                this.enemy.animation.frameY = 3;
                break;
            case 2: // Move down
                this.enemy.animation.maxFrame = 7;
                this.enemy.animation.frameY = 0;
                break;
            case 3: // Move left
                this.enemy.animation.maxFrame = 7;
                this.enemy.animation.frameY = 2;
                break;
            case 4: // Move right
                this.enemy.animation.maxFrame = 7;
                this.enemy.animation.frameY= 1;
                break;
        }
        this.enemy.animation.updateSprite(timestamp-this.movementPattern.lastTimestampUpdate);
}

    
}
export {WalkingState}