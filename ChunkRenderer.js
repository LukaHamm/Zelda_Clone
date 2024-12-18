class ChunkRenderer {
    constructor(){

    }

    draw(chunk, ctx){
        let row=0;
        let col=0;
        const tilePartMax = Math.round(Math.sqrt(Math.pow(1024,2)/Math.pow(chunk.tiles[0].tileLength,2)));
        const rowsMax = Math.round(Math.sqrt(tilePartMax));
        const colsMax = rowsMax;
        chunk.tiles.forEach(tile => {
            if(col >= colsMax){
                col = 0;
                row = row+1;
            }
            if(row >= rowsMax){
                row = 0;
                col=0;
            }
            col++;
            row++;
            tile.draw(ctx,col,row);
        });
        /*chunk.entityArray.forEach(entity => {
            entity.draw(ctx)
        });*/
    }

    update(chunk, input){
        this.speed = 10*chunk.speedmodifier;
        
        if(input.keys.indexOf("ArrowRight") > -1){
             this.x = this.x - this.speed;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            if(this.x >= this.width){
                this.x = 0;
            }
            this.x = this.x + this.speed;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            if(this.y <= -this.height){
                this.y = 0;
            }
            this.y = this.y - this.speed;
        }else if(input.keys.indexOf("ArrowUp") >-1){
            if(this.y >= this.height){
                this.y = 0;
            }
            this.y = this.y + this.speed;
        }
    }

}

export {ChunkRenderer}