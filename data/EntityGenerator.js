import { TreeEntity } from "../model/TreeEntity.js"
import { Enemy } from "../model/Enemy.js";
import {MovementPattern} from "../controls/MovementPattern.js";
import { WalkingPattern } from "../controls/WalkingPattern.js";
import { EnemyStateBuilder } from "./EnemyStateBuilder.js";
import { IdleTrigger } from "../controls/IdleTrigger.js";
import { WalkingTrigger } from "../controls/WalkTrigger.js";
import { MushroomEnemy } from "../model/MushroomEnemy.js";
import { EnemyStateMachine } from "../controls/EnemyStateMachine.js";
class EntityGenerator{

 

    static generateEntity (entityID,x,y,width,height,entityUniqueId){
        switch(entityID){
            case "101":
                return new TreeEntity(x,y,width,height,entityUniqueId);
            case "102":
                let enemy = new MushroomEnemy(x,y,width/2,height/2,entityUniqueId);
                let walkPattern = new WalkingPattern(enemy,  100, 5);
                
                let initialState = new EnemyStateBuilder().setMovementPattern(walkPattern).setNextState(null).setStateType("idle").setTrigger(new WalkingTrigger(['dx','dy'], [0,0]))
                let secondaryState = new EnemyStateBuilder().setMovementPattern(walkPattern).setNextState(initialState).setStateType("idle").setTrigger(new IdleTrigger(['dx','dy'], [0,0]))
                initialState.setNextState(secondaryState);
                let stateMachine = new EnemyStateMachine(initialState);
                enemy.stateMachine=stateMachine;
                let pattern = new MovementPattern(enemy, 100, 5);
                enemy.setMovementPattern(pattern);
                return enemy
            default:
                return null;
        }
    }

    //TODO spaeter Map?
    static serializeEntity(entity){
        if(entity instanceof TreeEntity){
            return "101"
        }else if(entity instanceof Enemy){
            return "102";
        }
    }
}





export {EntityGenerator}