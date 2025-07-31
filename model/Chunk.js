/*  - Tiles verwenden 
    - Chunk Aktualisierung
    - Chunk zeichnen

*/

import { EntityGenerator } from "../data/EntityGenerator.js";
import { TreeEntity } from "../model/TreeEntity.js";


class Chunk {
    static maxTileCount=200;
    static maxTileCountWidth = 20;
    static maxTileCountHeight=10;

    static copyChunk(chunk){
        let entityarrayCopy = []
        chunk.entityArray.forEach(entity => {
            if(entity instanceof TreeEntity){
            let tree = EntityGenerator.generateEntity("101",entity.x,entity.y,entity.width,entity.height)
            entityarrayCopy.push(tree)
            }
        })
        return new Chunk(entityarrayCopy,chunk.x,chunk.y,chunk.tiles,chunk.tileVariation,chunk.canvasHeight,chunk.canvasWidth,chunk.chunkid)
    }

    constructor(entityArray,x,y,tiles,tileVariation, canvasHeight,canvasWidth,chunkid){
        this.entityArray = entityArray;
        this.tiles = tiles;
        this.x=x;
        this.y=y;
        this.speedmodifier=0.6;
        this.tileVariation=tileVariation;
        this.offsetx = 0;
        this.offsetY = 0;
        this.canvasHeight=canvasHeight;
        this.canvasWidth = canvasWidth;
        this.chunkid=chunkid;
    }
    


    loadChunk(ctx){
        this.loadBackground(ctx)
        this.entityArray.array.forEach(entity => {
            entity.draw(ctx);
        });

        
    }


    setOffsetX(offsetx){
        this.offsetx = offsetx;
    }

    setOffsetY(offsetY){
        this.offsetY = offsetY;
    }

    loadBackground(ctx){
        this.tiles.forEach(tile => {
            tile.draw(ctx);
        })
    }

    updateEntityHitbox(){
        this.entityArray.forEach(entity => {
            //entity.updateHitbox(this.offsetx,this.offsetY)
            if(entity.x > 0, entity.x < this.canvasWidth, entity.y > 0, entity.y < this.canvasHeight){
                entity.inFrame = true;
            }
        })
    }


    removeEntity(entity){
        this.entityArray = this.entityArray.filter(e => e.id !== entity.id)
    }


    


}

export {Chunk}