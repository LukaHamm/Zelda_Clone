class Layer {
    constructor(){

    }

    renderOrder(chunks,player, rootChunk){
        const layers = new Map()
        const layerMap = new Map()
        const entityInBackground = []
        const entityInForeground = []
        const entityArrayAllChunks = [];
        let sortedChunks = chunks.sort((a,b) => a.offsetY -b.offsetY);
        sortedChunks.forEach(chunk =>{
        chunk.entityArray.forEach(entity => {
            let chunkEntity = [chunk.offsetY,entity]
            entityArrayAllChunks.push(chunkEntity)
            /*if(entityArraySortedAllChunks.length == 0){
                let chunkEntity = [chunk.offsetY,entity]
                entityArraySortedAllChunks.push(chunkEntity);
            }else{
                for(let i = 0; i < entityArraySortedAllChunks.length; i++){
                    if ((entity.y + chunk.offsetY + entity.height) >= (entityArraySortedAllChunks[i][1].y + entityArraySortedAllChunks[i][1].height + entityArraySortedAllChunks[i][0])){
                        let chunkEntity = [chunk.offsetY,entity]
                        entityArraySortedAllChunks.splice(i,0,chunkEntity);
                        break;
                    }else{
                        let chunkEntity = [chunk.offsetY,entity]
                        entityArraySortedAllChunks.splice(i+1,0,chunkEntity);
                        break;
                    }
                }
            }*/

        });
    })

    let entityArraySortedAllChunks = entityArrayAllChunks.sort((a,b) => (b[0] + b[1].y + b[1].height) -(a[0] + a[1].y + a[1].height))
    
    let indexLayeringPlayer = 0;
    for(let i = 0; i< entityArraySortedAllChunks.length; i++){
        //current chunk
        if((player.y + player.height)>= (entityArraySortedAllChunks[i][1].y + entityArraySortedAllChunks[i][1].height + entityArraySortedAllChunks[i][0])){
            indexLayeringPlayer = i;
            break;
        }
    }
    let entitiesBehindPlayer = entityArraySortedAllChunks.slice(0,indexLayeringPlayer);
    let entitiesInFrontOfPlayer = entityArraySortedAllChunks.slice(indexLayeringPlayer);
    let entityArrayPlusPlayer= [...entitiesBehindPlayer, [0,player], ...entitiesInFrontOfPlayer];
    let currentIndex = 0;
    while(currentIndex < entityArrayPlusPlayer.length){
        let compareHeight = entityArrayPlusPlayer[currentIndex][1].y + entityArrayPlusPlayer[currentIndex][1].height + entityArrayPlusPlayer[currentIndex][0];
        entityArrayPlusPlayer[currentIndex][1].layer = currentIndex +1;
        let i = currentIndex;
        while(i< entityArrayPlusPlayer.length){
            if(compareHeight == (entityArrayPlusPlayer[i][1].y + entityArrayPlusPlayer[i][1].height + entityArrayPlusPlayer[i][0])){
                entityArrayPlusPlayer[i][1].layer = currentIndex +1;
            }else{
                break;
            }
            i++;
        }
        currentIndex=i;
    }
}

    checkbehind(entity, player, offsetY){
        return (player.y +player.height) < (entity.y + entity.height + offsetY);
    }

    checkInfront(entity, player,offsetY){
        return (player.y +player.height) > (entity.y + entity.height+offsetY);
    
    }

    checkSameLevel(entity, player,offsetY){
        return (player.y +player.height) == (entity.y + entity.height+offsetY)
    }

    
}

export {Layer}