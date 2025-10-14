class EnemyStateMachine{
    constructor(state){
        this.state=state;
    }


     prepareAction(){
            
    }

    enmeyAction(timeStamp){
        this.state.enmeyAction(timeStamp)
    }

    cancelAction(){

    }

    changeState(triggerContext){
        this.state = this.state.changeState(triggerContext);
        return this.state;
    }
}

export {EnemyStateMachine}