import { MovementPattern } from "./MovementPattern.js";
class WalkingPattern extends MovementPattern {
    constructor(entity, movementRadius, movementSpeed){
        super(entity,movementRadius,movementSpeed)
        this.initialX = entity.x;
        this.initialY = entity.y;
        this.maxX = this.initialX + movementRadius;
        this.minX = this.initialX - movementRadius;
        this.maxY = this.initialY + movementRadius;
        this.minY = this.initialY - movementRadius;
        this.updateDelay = 1000 / 30;
        this.movementChangeDelay = 2000;
        this.lastTimestampUpdate = 0;
        this.lastTimestampChangeDirection
        this.direction = 1;
        this.dy = 0;
        this.dx = 0;
    }


    update(timestamp) {
        this.prepareMovement(timestamp);
        let lastX = this.entity.x;
        let lastY = this.entity.y;
        if (timestamp - this.lastTimestampUpdate > this.updateDelay) {
            switch (this.direction) {
                case 1: // Move up
                    if (this.entity.y - this.movementSpeed > this.minY) {
                        this.entity.y = this.entity.y - this.movementSpeed;
                    }
                    break;
                case 2: // Move down
                    if (this.entity.y + this.movementSpeed < this.maxY) {
                        this.entity.y = this.entity.y + this.movementSpeed;
                    }
                    break;
                case 3: // Move left
                    if (this.entity.x + this.movementSpeed > this.minX) {
                        this.entity.x =  this.entity.x - this.movementSpeed;
                    }
                    break;
                case 4: // Move right
                    if (this.entity.x + this.movementSpeed < this.maxX) {
                        this.entity.x = this.entity.x + this.movementSpeed;
                    }
                    break;
            }
            this.dx = lastX - this.entity.x;
            this.dy = lastY - this.entity.y;
            this.lastTimestampUpdate = timestamp;
            this.entity.updateHitbox(this.entity.x, this.entity.y);

        }
    }


    prepareMovement(timestamp) {
        let deltaTime = timestamp - this.lastTimestampChangeDirection;
        if (deltaTime < this.movementChangeDelay) {
            return;
        }
        this.direction = Math.floor(Math.random() * 4) + 1;
        this.lastTimestampChangeDirection = timestamp;
    }

}

export {WalkingPattern}