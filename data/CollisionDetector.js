class CollisionDetector {
    constructor(){

    }

    static isCollision(chunk,hitboxA,player){
        return ((hitboxA.x + chunk.offsetx) <= (player.getHitBox().x + player.speed + player.getHitBox().width) &&
            (hitboxA.x + chunk.offsetx + hitboxA.width) >= (player.getHitBox().x + player.speed) &&
            (hitboxA.y+ chunk.offsetY) <= (player.getHitBox().y + player.vy + player.getHitBox().height) &&
            (hitboxA.y + chunk.offsetY + hitboxA.height) >= (player.getHitBox().y + player.vy));
    }


    static isAttackHit(chunk,hitboxEntity, hitboxAttack){
        return ((hitboxEntity.x + chunk.offsetx) <= (hitboxAttack.x + hitboxAttack.width) &&
            (hitboxEntity.x + chunk.offsetx + hitboxEntity.width) >= (hitboxAttack.x) &&
            (hitboxEntity.y+ chunk.offsetY) <= (hitboxAttack.y + hitboxAttack.height) &&
            (hitboxEntity.y + chunk.offsetY + hitboxEntity.height) >= (hitboxAttack.y));
    }

}

export{CollisionDetector}