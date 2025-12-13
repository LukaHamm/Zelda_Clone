class EnemyStateMachine{
    constructor(state){
        this.lastState = null;
        this.state=state;
    }


     prepareAction(){
            
    }

    entry(){
        this.state.entry();
    }

    enmeyAction(timeStamp){
        this.state.enmeyAction(timeStamp)
    }

    cancelAction(){

    }

    changeState(triggerContext){
        this.lastState = this.state;
        this.state = this.state.changeState(triggerContext);
        return this.state;
    }

    rollbackState(){
        if(this.lastState != null){
            this.state.rollback()
            this.state=this.lastState;
            this.lastState=null;
        }
        

    }
}

export {EnemyStateMachine}