class Layer {
    constructor(){

    }

    renderOrder(chunks,player){
        const layers = new Map()
        const layerMap = new Map()
        const entityInBackground = []
        const entityInForeground = []
        chunks.forEach(chunk =>{
        chunk.entityArray.forEach(entity => {
            if(this.checkbehind(entity,player,chunk.offsetY)){
                entity.layer=2;
            }
            if(this.checkInfront(entity,player,chunk.offsetY)){
                entity.layer=1;
            }
            if(this.checkSameLevel(entity,player,chunk.offsetY)){
                entity.layer=2;
            }
        });
    })
        
    }

    checkbehind(entity, player, offsetY){
        return (player.y +player.heigt) < (entity.y + entity.heigt + offsetY);
    }

    checkInfront(entity, player,offsetY){
        return (player.y +player.heigt) > (entity.y + entity.heigt+offsetY);
    
    }

    checkSameLevel(entity, player,offsetY){
        return (player.y +player.heigt) == (entity.y + entity.heigt+offsetY)
    }

    
}

export {Layer}