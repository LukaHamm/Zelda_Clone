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
            let tree = EntityGenerator.generateEntity("101",entity.x,entity.y,entity.width,entity.heigt)
            entityarrayCopy.push(tree)
            }
        })
        return new Chunk(entityarrayCopy,chunk.x,chunk.y,chunk.tiles,chunk.tileVariation)
    }

    constructor(entityArray,x,y,tiles,tileVariation){
        this.entityArray = entityArray;
        this.tiles = tiles;
        this.x=x;
        this.y=y;
        this.speedmodifier=0.6;
        this.tileVariation=tileVariation;
        this.offsetx = 0;
        this.offsetY = 0;
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


    update(input){
        this.speed = 10*this.speedmodifier;
        if(input.keys.indexOf("ArrowRight") > -1){
             this.x = this.x - this.speed;
             this.updateEntities(-this.speed,0);
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            this.x = this.x + this.speed;
            this.updateEntities(this.speed,0);
        }else if (input.keys.indexOf("ArrowDown") > -1){
            this.y = this.y - this.speed;
            this.updateEntities(0,-this.speed);
        }else if(input.keys.indexOf("ArrowUp") >-1){
            this.y = this.y + this.speed;
            this.updateEntities(0,this.speed);
        }
    }

    updateEntities(dx,dy){
        this.entityArray.forEach(entitiy => {
            entitiy.x += dx;
            entitiy.y += dy;
        })
    }
        

    checkCollisionWithEntity(player){
        this.entityArray.array.forEach(row => {
            row.forEach(entitiy =>{
             if(player.x < entitiy.x + entitiy.width &&
                player.x + player.width > entitiy.x &&
                player.y < entitiy.y + entitiy.height &&
                player.y + player.height > entitiy.y){
                return true;
             }
            })
         });
         return false;
    }


}

export {Chunk}