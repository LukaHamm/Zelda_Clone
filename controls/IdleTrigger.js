import { Trigger } from "./Trigger.js";
class IdleTrigger extends Trigger{
    static idleConditions = ['dx','dy','vx', 'vy']

    constructor(triggerConditions, triggerConditionValues){
        super(triggerConditions, triggerConditionValues)
    }

    evaluateTrigger(triggerContextMap){
       let triggerConditionsSatisfied = true;
        this.triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'dx':
                    if(triggerContextMap.get('dx') != value){
                        triggerConditionsSatisfied = false;
                    }
                    break;
                case 'dy':
                    if(triggerContextMap.get('dy') != value){
                    triggerConditionsSatisfied = false;
                    }
                    break;
            }
        });
        return triggerConditionsSatisfied;
    }

}

export {IdleTrigger}
