class State {
    constructor(){
    }

    playerAction(input){

    }

    changeState(input, player){
        if (input.keys.length == 0){
            return new Idle(player);
        }else  if(input.keys.indexOf("ArrowLeft") > -1 
        || input.keys.indexOf("ArrowRight") > -1 || input.keys.indexOf("ArrowDown") >-1 || input.keys.indexOf("ArrowUp") >-1){
            return new Walk(player);
        }
    }

}

export {State}