/*  - Tiles verwenden 
    - Chunk Aktualisierung
    - Chunk zeichnen

*/


class Chunk {
    constructor(entityArray,x,y,tiles){
        this.entityArray = entityArray;
        this.tiles = tiles;
        this.x=x;
        this.y=y;
        this.speedmodifier=0.6;
    }


    loadChunk(ctx){
        this.loadBackground(ctx)
        this.entityArray.array.forEach(entity => {
            entity.draw(ctx);
        });

        
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