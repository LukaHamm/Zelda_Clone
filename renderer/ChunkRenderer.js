class ChunkRenderer {
    constructor(){

    }

    draw(chunk, ctx){
        let row=0;
        let col=0;
        const tilePartMax = Math.round(Math.sqrt(Math.pow(1024,2)/Math.pow(chunk.tiles[0][0].tileLength,2)));
        const rowsMax = Math.floor(1024/chunk.tiles[0][0].tileLength);
        const colsMax = rowsMax;
        chunk.tileVariation.forEach(tileBackground => {
        for(let i = 0;i<chunk.tiles.length;i+=rowsMax){
            for(let j = 0;j<chunk.tiles[i].length;j+=rowsMax){
                while(row < rowsMax){
                    if(row+i >= chunk.tiles.length){
                        break;
                    }
                    while(col < colsMax){
                        if(col +j >= chunk.tiles[i].length){
                            break;
                        }
                        if(chunk.tiles[i+row][j+col].background===tileBackground){
                            chunk.tiles[i+row][j+col].draw(ctx,col,row,chunk.offsetx,chunk.offsetY)
                        }
                        col++;
                    }
                    col=0;
                    row++;
                }
                row=0;
            }
        }

        });
    
    


        /*chunk.entityArray.forEach(entity => {
            entity.draw(ctx)
        });*/
    }

    scroll(chunk, input){
        let speed = 5*chunk.speedmodifier;   
        if(input.keys.indexOf("ArrowRight") > -1){
             chunk.offsetx =chunk.offsetx - speed;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            chunk.offsetx =chunk.offsetx + speed;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            chunk.offsetY =  chunk.offsetY -speed
        }else if(input.keys.indexOf("ArrowUp") >-1){
            chunk.offsetY =  chunk.offsetY +speed
        }
    }

}

export {ChunkRenderer}