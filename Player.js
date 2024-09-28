class Player{
    constructor(gameWidth, gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.width = 200;
        this.heigt = 200;
        this.spriteWidth = 1024
        this.spriteHeight = 1024
        this.x = 0,
        this.y = this.gameHeight-this.heigt;
        this.image = document.getElementById('playerImage')
        this.frameX = 0;
        this.maxFrame = 7 ;
        this.frameY = 1;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.frameTimer = 0;
        this.fps =30;
        this.frameInterval = 1000/this.fps
    }

    restart(){
        this.x=100;
        this.y = this.gameHeight-this.heigt;
        this.maxFrame=7;
        this.frameY=1;
    }

    draw(context){
        context.strokeStyle = "white"
        context.strokeRect(this.x,this.y,this.width,this.heigt);
        context.beginPath();
        context.arc(this.x + this.width/2,this.y + this.heigt/2,this.width/2,0,Math.PI*2)
        context.stroke();
        context.fillStyle = 'white';
        context.drawImage(this.image,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,
            this.spriteHeight,this.x,this.y,this.width,this.heigt);
    }

    update(input, deltaTime){
        //collision detection
        /*enemies.forEach(enemy => {
            const dx = enemy.x + enemy.width/2 -(this.x + this.width/2);
            const dy = enemy.y + enemy.height/2 -(this.y + this.heigt/2);
            const distance = Math.sqrt(Math.pow(dy,2) + Math.pow(dx,2))
            if(distance < enemy.width/2 + this.width/2){
                gameOver = true;
            }
        })*/
        //sprite animation 
        if(this.frameTimer > this.frameInterval && (input.keys.indexOf("ArrowLeft") > -1 
        || input.keys.indexOf("ArrowRight") > -1)){
            if(this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        //controls
        if(input.keys.indexOf("ArrowRight") > -1){
            this.speed=5;
            this.maxFrame = 7;
            this.frameY = 1;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            this.speed=-5
            this.maxFrame = 7;
            this.frameY = 0;
        }else if((input.keys.indexOf("ArrowUp") >-1 || input.keys.indexOf("swipe up") > -1) && this.onGround()){
            this.vy -=30;
        }else {
            this.speed=0;
        }
        // horizontal movement
        this.x += this.speed;
        if(this.x < 0) this.x = 0;
        if(this.x + this.width > this.gameWidth) this.x = this.gameWidth-this.width;

        //vertical movement
        this.y += this.vy;
        if(this.y > this.gameHeight -this.heigt) this.y = this.gameHeight -this.heigt;
    }

    onGround(){
        return this.y >= this.gameHeight -this.heigt;
    }

}
export {Player}

