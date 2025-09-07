class EnemyState {
    constructor(enemy, movementPattern, nextState, trigger){
        this.enemy=enemy;
        this.movementPattern=movementPattern;
        this.nextState = nextState;
        this.trigger = trigger;
    }

    entry(){
        
    }

    prepareAction(){

    }

    enmeyAction(){

    }

    cancelAction(){

    }

    changeState(triggerContext){
        if(this.trigger.evaluateTrigger(triggerContext)){
            return this.nextState;
        }
        return this;
    }

    setNextState(state){
        this.state=state;
    }

}

export {EnemyState}