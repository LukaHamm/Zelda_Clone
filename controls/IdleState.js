import { EnemyState } from "./EnemyState.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
class IdleState extends EnemyState {
    constructor(enemy,pattern, nextState, trigger){
            super(enemy, pattern, nextState, trigger);
            this.updateDelay = 1000 / 30;
            this.lastTime = 0;
            this.animation = new SpriteAnimation(1024,1024,0,0,5,'enemyIdle',30,this.enemy.x,this.enemy.y,this.enemy.width,this.enemy.height);
    }

    entry(){
        this.enemy.animation = this.animation;
        this.movementPattern.leaveIdle=false;
    }

    enmeyAction(timeStamp){
        this.movementPattern.update(timeStamp);
        this.enemy.animation.updateSprite(timeStamp -this.movementPattern.lastTimestampUpdate);
    }

}

export {IdleState}