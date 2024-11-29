/*  - Tiles verwenden 
    - Chunk Aktualisierung
    - Chunk zeichnen

*/


class Chunk {
    constructor(entityArray,background,x,y){
        this.entityArray = entityArray;
        this.background = background;
        this.x=x;
        this.y=y;
    }


    loadChunk(ctx){
        this.loadBackground(ctx)
        this.entityArray.array.forEach(row => {
           row.forEach(entitiy =>{
            entitiy.x = row.indexOf(element);
            entitiy.y = array.indexOf(row);
            entitiy.draw(ctx)
           })
        });

        
    }


    loadBackground(ctx){

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