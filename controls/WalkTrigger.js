import { Trigger } from "./Trigger.js";

class WalkingTrigger extends Trigger{

    static walkConditions = ['dx','dy','vx', 'vy', 'bool']

    constructor(triggerConditions, triggerConditionValues){
        super(triggerConditions, triggerConditionValues)
    }

    evaluateTrigger(triggerContextMap){
        let triggerConditionsSatisfied = false;

        this.triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'dx':
                    if(Math.abs(triggerContextMap.get('dx')) > value){
                        triggerConditionsSatisfied = true;
                    }
                    break;
                case 'dy':
                   if(Math.abs(triggerContextMap.get('dy')) > value){
                    triggerConditionsSatisfied = true;
                   }
                   break;
                case 'bool':
                triggerConditionsSatisfied = triggerContextMap.get('bool');
                   break;
            }
        });
        return triggerConditionsSatisfied;

    }
}

export {WalkingTrigger}