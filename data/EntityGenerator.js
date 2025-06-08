import { TreeEntity } from "../model/TreeEntity.js"
import { Enemy } from "../model/Enemy.js";
import {MovementPattern} from "../controls/MovementPattern.js";
class EntityGenerator{

 

    static generateEntity (entityID,x,y,width,height,entityUniqueId){
        switch(entityID){
            case "101":
                return new TreeEntity(x,y,width,height,entityUniqueId);
            case "102":
                let enemy = new Enemy(x,y,width/2,height/2,entityUniqueId);
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