import { Idle } from "./Control.js";
import { Walk } from "./Control.js";
import { Attack } from "./Control.js";
import { Invisiblity } from "./Control.js";
class State {
    constructor(){
    }

    playerAction(input){

    }

    prepareAction(player,input){
        
    }

    changeState(input, player){
        if (player.isHitByEnemy){
            if(this instanceof Invisiblity != true){
                return new Invisiblity(player, this);
            }
        }
        else if (input.keys.length == 0){
            if(this instanceof Idle != true){
                return new Idle(player);
            }else {
                return this;
            }
        }else  if(input.keys.indexOf("a") > -1 
        || input.keys.indexOf("d") > -1 || input.keys.indexOf("s") >-1 || input.keys.indexOf("w") >-1){
            if(this instanceof Walk !=true){
                return new Walk(player);
            }else {
                return this;
            }
            
        } else if (input.keys.indexOf("ArrowDown") > -1 
        || input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf("ArrowLeft") >-1 || input.keys.indexOf("ArrowRight") >-1){
            if(this instanceof Attack !=true){
                return new Attack(player);
            }else {
                return this;
            }
        } 
        else {
            return this;
        }
    }

}

export {State}