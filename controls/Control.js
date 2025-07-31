import { State } from "./State.js";
import { InputHandler } from "./InputHandler.js";
import { SpriteAnimation } from "../animation/SpriteAnimation.js";
class Control{
    constructor(player,input){
        this.input = input;
        this.state = new Idle(player)
        this.lastTime = 0;
        
        
    }

    changeState(player,timestamp){
        this.state = this.state.changeState(this.input,player,timestamp - this.lastTime);
    }

    playerAction(player,timestamp){
        let deltaTime = timestamp - this.lastTime;
        this.state.playerAction(player,this.input,deltaTime);
        this.lastTime = timestamp;
    }

    prepareAction(player){
        this.state.prepareAction(player,this.input);
    }



}

class Idle extends State {

    static maxFrame = 5; // Maximum frames for the idle animation
    constructor(player){
        super();
        this.animation = new SpriteAnimation(1024,1024,0,0,Idle.maxFrame,'playerIdle',30,player.x,player.y,player.width,player.height)
    }

    playerAction(player,input, deltaTime){
        this.animation.updateSprite(deltaTime);
    }
    
}

class Walk extends State{
    static maxFrame = 7; // Maximum frames for the walk animation
    constructor(player){
        super();
        this.animation = new SpriteAnimation(1024,1024,0,1,Walk.maxFrame,'playerImage',30,player.x,player.y,player.width,player.height)
    }

    prepareAction(player,input){
        
        if(input.keys.indexOf("d") > -1){
            player.speed=5;
            player.vy=0
            this.animation.frameY= 1;
            
        } else if (input.keys.indexOf("a") > -1){
            player.speed=-5
            player.vy=0
            this.animation.frameY = 0;
        }else if (input.keys.indexOf("s") > -1){
            player.vy=5
            player.speed=0;
            this.animation.frameY = 2;
        }else if(input.keys.indexOf("w") >-1){
            player.vy=-5;
            player.speed=0;
            this.animation.frameY = 3;
        }else {
            player.speed=0;
            player.vy = 0;
        }
    }
    
    playerAction(player, input, deltaTime){
        this.animation.updateSprite(deltaTime);
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
        if(player.y > player.gameHeight -player.height){
            player.y = player.gameHeight -player.height;
             this.animation.y = player.gameHeight -player.height
        }
        if(player.y < 0){
            player.y=0;
            this.animation.y = 0;    
        }
        player.updatePlayerHitBox();
    }

}


class Attack extends State {
    static maxFrame = 9; // Maximum frames for the attack animation

    constructor(player){
        super();
        this.animation = new SpriteAnimation(1024,1024,0,1,Attack.maxFrame,'playerAttack',60,player.x,player.y,player.width,player.height)
    }


    playerAction(player, input, deltaTime){
        //update player hitbox
        player.updatePlayerHitBox();
        this.animation.updateSprite(deltaTime);
    }

    prepareAction(player,input){
        let multiplyer = this.animation.frameX > player.currentAttackBox.frameAttackMotion?player.currentAttackBox.multiplyerEndMotion:player.currentAttackBox.multiplyerBeginMotion;
        if(input.keys.indexOf("ArrowDown") > -1){
            this.animation.frameY= 2;
            player.currentAttackBox = player.attackboxBack;
            player.updateAttackHitbox(player.x,player.y);
            player.moveHitBox(multiplyer*player.currentAttackBox.swingStep)
        } else if (input.keys.indexOf("ArrowUp") > -1){
            this.animation.frameY = 3;
            player.currentAttackBox = player.attackboxFront;
            player.updateAttackHitbox(player.x,player.y);
            player.moveHitBox(multiplyer*player.currentAttackBox.swingStep)
        }else if (input.keys.indexOf("ArrowLeft") > -1){
            this.animation.frameY = 1;
            player.currentAttackBox = player.attackboxLeft
            player.updateAttackHitbox(player.x,player.y);
            player.moveHitBox(multiplyer*player.currentAttackBox.swingStep)
        }else if(input.keys.indexOf("ArrowRight") >-1){
            this.animation.frameY = 0;
            player.currentAttackBox = player.attackboxRight
            player.updateAttackHitbox(player.x,player.y);
            player.moveHitBox(multiplyer*player.currentAttackBox.swingStep)
        }else {
            
        }
    }

    

}

class Invisiblity extends State {
    constructor(player, state){
        super();
        this.lastTime = 0;
        this.invisibilityTime = 5000; // 5 seconds of invisibility
        this.state = state; // The state to return to after invisibility
        this.state.animation.maxFrame++; // Reset the max frame for the animation
        this.animation = state.animation; // Use the animation from the previous state
    }

    playerAction(player, input, deltaTime){
        this.state.playerAction(player, input, deltaTime);
        this.animation = this.state.animation; // Keep the same animation as the previous state
    }

    changeState(input, player,deltaTime){
        let previousState = this.state.constructor.name; // Get the name of the previous state
        this.state = this.state.changeState(input, player);
        if (this.state.constructor.name !== previousState) {
            this.state.animation.maxFrame++; 
            this.animation = this.state.animation; // Keep the same animation as the previous state
        }// Reset the max frame for the new state}
        if (this.lastTime > this.invisibilityTime) {
            this.lastTime = 0;
            this.state.animation.maxFrame--; // Reset the max frame for the animation
            return this.state; // Return to the previous state after invisibility
        }else {
            this.lastTime += deltaTime; // Increment the last time by the delta time
            return this; // Stay in invisibility state
        }
    }

    prepareAction(player,input){
        this.state.prepareAction(player, input);
    }

}

export {Control, Idle, Walk, Attack, Invisiblity}
