import { TreeEntity } from "../model/TreeEntity.js"
import { Enemy } from "../model/Enemy.js";
class EntityGenerator{

    static generateEntity (entityID,x,y,width,height){
        switch(entityID){
            case "101":
                return new TreeEntity(x,y,width,height);
            case "102":
                return new Enemy(x,y,width/2,height/2)
            default:
                return null;
        }
    }
}


export {EntityGenerator}