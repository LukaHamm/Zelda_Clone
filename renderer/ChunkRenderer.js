class ChunkRenderer {
    static iteration = 5;
    constructor() {

    }

    draw(chunk, ctx) {
        let row = 0;
        let col = 0;
        const tilePartMax = Math.round(Math.sqrt(Math.pow(1024, 2) / Math.pow(chunk.tiles[0][0].tileLength, 2)));
        const rowsMax = Math.floor(1024 / chunk.tiles[0][0].tileLength);
        const colsMax = rowsMax;
        chunk.tileVariation.forEach(tileBackground => {
            for (let i = 0; i < chunk.tiles.length; i += rowsMax) {
                for (let j = 0; j < chunk.tiles[i].length; j += rowsMax) {
                    while (row < rowsMax) {
                        if (row + i >= chunk.tiles.length) {
                            break;
                        }
                        while (col < colsMax) {
                            if (col + j >= chunk.tiles[i].length) {
                                break;
                            }
                            if (chunk.tiles[i + row][j + col].background === tileBackground) {
                                chunk.tiles[i + row][j + col].draw(ctx, col, row, chunk.offsetx, chunk.offsetY)
                            }
                            col++;
                        }
                        col = 0;
                        row++;
                    }
                    row = 0;
                }
            }

        });



    }

    drawEntitties(chunk, ctx, control) {
        chunk.entityArray.forEach(entity => {
            entity.draw(ctx, chunk.offsetx, chunk.offsetY);
        });
    }

    drawEntittiesDynamic(chunks, ctx, control, player) {
        const entityLayering = new Map()
        chunks.forEach(chunk => {
            chunk.entityArray.forEach(entity => {
                    if (entityLayering.has(entity.layer)) {
                        if (entityLayering.get(entity.layer).has(chunk)) {
                            entityLayering.get(entity.layer).get(chunk).push(entity)
                        } else {
                            entityLayering.get(entity.layer).set(chunk, [entity])
                        }
                    }else {
                        let entityChunkMap = new Map([[chunk,[entity]]])
                        entityLayering.set(entity.layer, entityChunkMap);
                    }
            })

        })
        let sortedEntityLayering = new Map([...entityLayering.entries()].sort((a, b) => b[0] - a[0]));

        sortedEntityLayering.forEach((chunkEntityMap,layer) => {
            chunkEntityMap.forEach((entityArray,chunk) => {
                
                entityArray.forEach(entity => {
                    entity.draw(ctx, chunk.offsetx, chunk.offsetY, player);
                })
                

            })
            if (layer >= player.layer) {
                        control.state.animation.drawSprite(ctx);
            }
        })
    }


    scroll(chunk, input) {
        let speed = ChunkRenderer.iteration * chunk.speedmodifier;
        if (input.keys.indexOf("d") > -1) {
            chunk.offsetx = chunk.offsetx - speed;
        } else if (input.keys.indexOf("a") > -1) {
            chunk.offsetx = chunk.offsetx + speed;
        } else if (input.keys.indexOf("s") > -1) {
            chunk.offsetY = chunk.offsetY - speed
        } else if (input.keys.indexOf("w") > -1) {
            chunk.offsetY = chunk.offsetY + speed
        }
        chunk.updateEntityHitbox();
    }

}

export { ChunkRenderer }