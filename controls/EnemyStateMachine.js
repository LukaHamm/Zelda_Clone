class EnemyStateMachine{
    constructor(state){
        this.state=state;
    }


     prepareAction(){
            
    }

    enmeyAction(deltaTime){
        this.state.enmeyAction(deltaTime)
    }

    cancelAction(){

    }

    changeState(triggerContext){
        this.state = this.state.changeState(triggerContext);
    }
}

export {EnemyStateMachine}