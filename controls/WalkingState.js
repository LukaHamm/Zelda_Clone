import { EnemyState } from "./EnemyState.js";
class WalkingState extends EnemyState{
    constructor(enemy, movementPattern, nextState, trigger){
        super(enemy, movementPattern, nextState, trigger);
        this.movementPattern=movementPattern;
    }

    entry(){
        this.movementPattern.setEnemy(enemy);
        this.enemy.animation =  new SpriteAnimation(1024,1024,0,1,7,'enemyWalk',30,this.x,this.y,this.width,this.height);
    }

    prepareAction(){
        
    }

    enmeyAction(deltaTime){
        this.movementPattern.walkAction();
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
        this.animation.updateSprite(deltaTime);
}

    
}
export {WalkingState}