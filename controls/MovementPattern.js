class MovementPattern {
    constructor(entity, movementRadius, movementSpeed) {
        this.entity=entity;
        this.movementRadius = movementRadius;
        this.movementSpeed = movementSpeed
        this.initialX = entity.x;
        this.initialY = entity.y;
        this.maxX = this.initialX + movementRadius;
        this.minX = this.initialX - movementRadius;
        this.maxY = this.initialY + movementRadius;
        this.minY = this.initialY - movementRadius;
        this.updateDelay = 1000/30;
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
                this.entity.y = Math.max(this.minY, this.entity.y - this.movementSpeed);
                break;
            case 2: // Move down
                this.entity.y = Math.min(this.maxY, this.entity.y + this.movementSpeed);
                break;
            case 3: // Move left
                this.entity.x = Math.max(this.minX, this.entity.x - this.movementSpeed);
                break;
            case 4: // Move right
                this.entity.x = Math.min(this.maxX, this.entity.x + this.movementSpeed);
                break;
        }
        this.dx = lastX - this.entity.x;
        this.dy = lastY - this.entity.y;
        this.lastTimestampUpdate = timestamp;
        this.entity.updateHitbox(this.entity.x, this.entity.y);
            
        }
        this.entity.updateSprite(timestamp-this.lastTimestampUpdate)
    }


    prepareMovement(timestamp) {
        let deltaTime = timestamp - this.lastTimestampChangeDirection;
        if (deltaTime < this.movementChangeDelay) {
            return;
        }
        this.direction = Math.floor(Math.random() * 4) +1;
        this.lastTimestampChangeDirection = timestamp;
        }
       
    

    cancelMovement() {
        // This method should be overridden by subclasses to implement specific movement patterns
    }




}

export {MovementPattern}