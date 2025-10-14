import { MovementPattern } from "./MovementPattern.js";

class IdlePattern extends MovementPattern{
    constructor(entity, movementRadius, movementSpeed){
        super(entity, movementRadius, movementSpeed)
        this.updateDelay = 1000 / 30;
        this.movementChangeDelay = 2000;
        this.lastTimestampUpdate = 0;
        this.lastTimestampChangeDirection
        this.leaveIdle=false;
        this.dy = 0;
        this.dx = 0;
    }
        
    update(timeStamp){
        this.prepareMovement(timeStamp);
        if (timeStamp - this.lastTimestampUpdate > this.updateDelay) {
            this.lastTimestampUpdate = timeStamp;
        }
        
    }


    prepareMovement(timestamp) {
        let deltaTime = timestamp - this.lastTimestampChangeDirection;
        if (deltaTime < this.movementChangeDelay) {
            return;
        }
        this.leaveIdle =  Math.random() < 0.5;
    }
        
}

export {IdlePattern}