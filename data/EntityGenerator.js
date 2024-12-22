import { TreeEntity } from "../model/TreeEntity.js"
class EntityGenerator{

    static generateEntity (entityID,x,y,width,height){
        switch(entityID){
            case "101":
                return new TreeEntity(x,y,width,height);
            default:
                return null;
        }
    }
}

export {EntityGenerator}