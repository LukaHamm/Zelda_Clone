class SpriteAnimation {
    constructor(spriteWidth,spriteHeight, frameX,frameY,maxFrame,imageId,fps, x,y,width,height){
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.frameX = frameX;
        this.maxFrame = maxFrame;
        this.frameY = frameY;
        this.image = document.getElementById(imageId)
        this.fps =fps;
        this.frameInterval = 1000/this.fps
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.frameTimer=0;
    }

    updateSprite(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    

    drawSprite(context){
        context.drawImage(this.image,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,
            this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

export {SpriteAnimation}