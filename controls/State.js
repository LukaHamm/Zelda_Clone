import { Idle } from "./Control.js";
import { Walk } from "./Control.js";
class State {
    constructor(){
    }

    playerAction(input){

    }

    prepareAction(player,input){
        
    }

    changeState(input, player){
        if (input.keys.length == 0){
            if(this instanceof Idle != true){
                return new Idle(player);
            }else {
                return this;
            }
        }else  if(input.keys.indexOf("ArrowLeft") > -1 
        || input.keys.indexOf("ArrowRight") > -1 || input.keys.indexOf("ArrowDown") >-1 || input.keys.indexOf("ArrowUp") >-1){
            if(this instanceof Walk !=true){
                return new Walk(player);
            }else {
                return this;
            }
            
        }
    }

}

export {State}