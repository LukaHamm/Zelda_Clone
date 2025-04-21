class Background{
    constructor(image, speedmodifier,width,height){
        //super(0,0,height,width)
        this.x = 0;
        this.y = 0;
        this.width =width;
        this.height = height;
        this.image= image;
        this.speedmodifier=speedmodifier;
        this.speed = 2*this.speedmodifier;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update(input){
        this.speed = 10*this.speedmodifier;
        
        if(input.keys.indexOf("d") > -1){
            if(this.x <= -this.width){
                this.x = 0;
            }
             this.x = this.x - this.speed;
        } else if (input.keys.indexOf("a") > -1){
            if(this.x >= this.width){
                this.x = 0;
            }
            this.x = this.x + this.speed;
        }else if (input.keys.indexOf("s") > -1){
            if(this.y <= -this.height){
                this.y = 0;
            }
            this.y = this.y - this.speed;
        }else if(input.keys.indexOf("w") >-1){
            if(this.y >= this.height){
                this.y = 0;
            }
            this.y = this.y + this.speed;
        }
        
        //this.x = this.x - this.speed;
    
      // this.x = gameframe*this.speed % this.width;
        
    }

    draw(ctx, input){
        ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
        if(input.keys.indexOf("ArrowRight") > -1){
            this.offsetX = this.width;
            this.offsetY=0;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            this.offsetX = -this.width
            this.offsetY=0;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            this.offsetY = this.height;
            this.offsetX = 0;
        }else if(input.keys.indexOf("ArrowUp") >-1){
            this.offsetY = -this.height;
            this.offsetX = 0;
        }
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width,this.height);
        ctx.drawImage(this.image, this.x + -this.width, this.y , this.width,this.height);
        ctx.drawImage(this.image, this.x, this.y + this.height, this.width,this.height);
        ctx.drawImage(this.image, this.x +this.width, this.y + this.height, this.width,this.height);
        ctx.drawImage(this.image, this.x -this.width, this.y + this.height, this.width,this.height);
        ctx.drawImage(this.image, this.x, this.y + -this.height, this.width,this.height);
        ctx.drawImage(this.image, this.x +this.width, this.y + -this.height, this.width,this.height);
        ctx.drawImage(this.image, this.x -this.width, this.y + -this.height, this.width,this.height);
        //ctx.drawImage(this.image, this.x + this.width, this.y, this.width,this.height);

    }
}

export {Background}