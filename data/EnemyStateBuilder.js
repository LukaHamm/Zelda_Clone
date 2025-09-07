import { WalkingState } from "../controls/WalkingState.js";
//import { AttackState } from "../controls/AttackState.js";
import { IdleState } from "../controls/IdleState";

class EnemyStateBuilder {
        constructor(){

        }
        
    setNextState(state) { 
        this.nextState = state; 
        return this; 
    }
     
    setStateType(stateType){
        this.stateType=stateType;
        return this;
    }

    setMovementPattern(movementPattern){
        this.movementPattern=movementPattern;
        return this;
    }

    setTrigger(trigger){
        this.trigger=trigger;
    }

    build(){
        switch (this.stateType) {
            case "walking":
                return new WalkingState(this.enemy, this.movementPattern, this.nextState, this.trigger);
            case "attack":
                //return new AttackState(this.enemy, this.pattern, this.nextState, this.trigger);
            // weitere States ...
            case "idle":
                return new IdleState(this.enemy, this.nextState,this.trigger)
            default:
                throw new Error("Unbekannter State-Typ: " + this.stateType);
    }
}

}

export {EnemyStateBuilder}