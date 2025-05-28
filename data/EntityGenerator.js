import { TreeEntity } from "../model/TreeEntity.js"
import { Enemy } from "../model/Enemy.js";
class EntityGenerator{

 

    static generateEntity (entityID,x,y,width,height,entityUniqueId){
        switch(entityID){
            case "101":
                return new TreeEntity(x,y,width,height,entityUniqueId);
            case "102":
                return new Enemy(x,y,width/2,height/2,entityUniqueId)
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