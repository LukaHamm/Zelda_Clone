import { State } from "./State.js";
import { InputHandler } from "./InputHandler.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
class Control{
    constructor(player,input){
        this.input = input;
        this.state = new Idle(player)
        
        
    }

    changeState(player){
        this.state = this.state.changeState(this.input,player);
    }

    playerAction(player,deltaTime){
        this.state.playerAction(player,this.input,deltaTime);
    }



}

class Idle extends State {

    constructor(player){
        super();
        this.animation = new SpriteAnimation(1024,1024,0,0,7,'playerIdle',30,player.x,player.y,player.width,player.heigt)
    }

    playerAction(player,input, deltaTime){
        
    }
    
}

class Walk extends State{
    constructor(player){
        super();
        this.animation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,player.x,player.y,player.width,player.heigt)
    }

    
    playerAction(player, input, deltaTime){
        this.animation.updateSprite(deltaTime);
        if(input.keys.indexOf("ArrowRight") > -1){
            player.speed=5;
            player.vy=0
            this.animation.maxFrame = 7;
            this.animation.frameY= 1;
            
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            player.speed=-5
            player.vy=0
            this.animation.maxFrame = 7;
            this.animation.frameY = 0;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            player.vy=5
            player.speed=0;
            this.animation.maxFrame = 7;
            this.animation.frameY = 2;
        }else if(input.keys.indexOf("ArrowUp") >-1){
            player.vy=-5;
            player.speed=0;
            this.animation.maxFrame = 7;
            this.animation.frameY = 3;
        }else {
            player.speed=0;
            player.vy = 0;
        }
        player.x += player.speed;
        this.animation.x +=player.speed;
        if(player.x < 0){ 
            player.x = 0;
            this.animation.x = 0;
        }
        if(player.x + player.width > player.gameWidth){
            player.x = player.gameWidth-player.width;
            this.animation.x = player.gameWidth-player.width;
        }
        
        //vertical movement
        player.y += player.vy;
        this.animation.y += player.vy
        if(player.y > player.gameHeight -player.heigt){
            player.y = player.gameHeight -player.heigt;
             this.animation.y = player.gameHeight -player.heigt
        }
        if(player.y < 0){
            player.y=0;
            this.animation.y = 0;    
        }
    }


}

export {Control, Idle, Walk}