class CollisionDetector {
    constructor(){

    }

    static isCollision(chunk,hitboxA,player){
        return ((hitboxA.x + chunk.offsetx) <= (player.getHitBox().x + player.speed + player.getHitBox().width) &&
            (hitboxA.x + chunk.offsetx + hitboxA.width) >= (player.getHitBox().x + player.speed) &&
            (hitboxA.y+ chunk.offsetY) <= (player.getHitBox().y + player.vy + player.getHitBox().height) &&
            (hitboxA.y + chunk.offsetY + hitboxA.height) >= (player.getHitBox().y + player.vy));
    }

}

export{CollisionDetector}