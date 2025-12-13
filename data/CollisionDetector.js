class CollisionDetector {

    static lastHit = 0;
    static delaHit = 500; // delay between hits in ms
    constructor(){

    }

    static isCollision(chunk,hitboxA,player){
        return ((hitboxA.x + chunk.offsetx) <= (player.getHitBox().x + player.speed + player.getHitBox().width) &&
            (hitboxA.x + chunk.offsetx + hitboxA.width) >= (player.getHitBox().x + player.speed) &&
            (hitboxA.y+ chunk.offsetY) <= (player.getHitBox().y + player.vy + player.getHitBox().height) &&
            (hitboxA.y + chunk.offsetY + hitboxA.height) >= (player.getHitBox().y + player.vy));
    }


    static isAttackHit(chunk,hitboxEntity, hitboxAttack, timeStamp){
        /*if(timeStamp - this.lastHit < this.delaHit){
            return false;
        }
        this.lastHit = timeStamp;*/
        return ((hitboxEntity.x + chunk.offsetx) <= (hitboxAttack.x + hitboxAttack.width) &&
            (hitboxEntity.x + chunk.offsetx + hitboxEntity.width) >= (hitboxAttack.x) &&
            (hitboxEntity.y+ chunk.offsetY) <= (hitboxAttack.y + hitboxAttack.height) &&
            (hitboxEntity.y + chunk.offsetY + hitboxEntity.height) >= (hitboxAttack.y));
    }

    static isCollisionEntity(chunk, hitboxA, hitboxB){
        return ((hitboxA.x + chunk.offsetx) <= (hitboxB.x + hitboxB.width + chunk.offsetx) &&
            (hitboxA.x + chunk.offsetx + hitboxA.width) >= (hitboxB.x + chunk.offsetx) &&
            (hitboxA.y+ chunk.offsetY) <= (hitboxB.y + hitboxB.height + chunk.offsetY) &&
            (hitboxA.y + chunk.offsetY + hitboxA.height) >= (hitboxB.y + chunk.offsetY));
    }

}

export{CollisionDetector}