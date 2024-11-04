import { State } from ".State";
import { InputHandler } from "./InputHandler.js";
class Control{
    constructor(player){
        this.input = new InputHandler();
        this.state = new Idle(player)
        
        
    }

    changeState(input, player){
        this.state = this.state.changeState(player, input);
    }

    playerAction(player,input){
        this.state.playerAction(input);
    }


}

class Idle extends State {

    constructor(player){
        this.idleAnimation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,player.x,player.y,player.width,player.heigt)
    }

    playerAction(player){
        
    }
    
}

class Walk extends State{
    constructor(player){
        this.walkAnimation = new SpriteAnimation(1024,1024,0,1,7,'playerImage',30,player.x,player.y,player.width,player.heigt)
    }

    
    playerAction(player, input){
        if(input.keys.indexOf("ArrowRight") > -1){
            player.speed=5;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY= 1;
        } else if (input.keys.indexOf("ArrowLeft") > -1){
            player.speed=-5
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 0;
        }else if (input.keys.indexOf("ArrowDown") > -1){
            player.vy=5
            player.speed=0;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 2;
        }else if(input.keys.indexOf("ArrowUp") >-1){
            player.vy=-5;
            player.speed=0;
            this.walkAnimation.maxFrame = 7;
            this.walkAnimation.frameY = 3;
        }else {
            player.speed=0;
            player.vy = 0;
        }
    }


}
