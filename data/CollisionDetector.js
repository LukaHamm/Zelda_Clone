class CollisionDetector {
    constructor(){

    }

    static isCollision(chunk,hitboxA,hitboxB){
        return ((hitboxA.x + chunk.offsetx) <= (hitboxB.x + hitboxB.speed + hitboxB.width) &&
            (hitboxA.x + chunk.offsetx + hitboxA.width) >= hitboxB.x + hitboxB.speed &&
            (hitboxA.y+ chunk.offsetY) <= (hitboxB.y + hitboxB.vy + hitboxB.heigt) &&
            (hitboxA.y + chunk.offsetY + hitboxA.height) >= hitboxB.y + hitboxB.vy);
    }

}

export{CollisionDetector}