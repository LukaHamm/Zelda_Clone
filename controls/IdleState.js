import { EnemyState } from "./EnemyState";
import { SpriteAnimation } from "../animation/SpriteAnimation";
class IdleState extends EnemyState {
    constructor(enemy, nextState, trigger){
            super(enemy, null, nextState, trigger);
    }

    entry(){
        this.enemy.animation = new SpriteAnimation(1024,1024,0,0,5,'enemyIdle',30,this.x,this.y,this.width,this.height);
    }

    enmeyAction(deltaTime){
        this.enemy.animation.updateSprite(deltaTime);
    }

}

export {IdleState}