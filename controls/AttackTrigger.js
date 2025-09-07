import { Trigger } from "./Trigger.js";
class AttackTrigger extends Trigger{

    static attackTriggerConditions = ['radius', 'attacked'];

    constructor(triggerConditions, triggerConditionValues){
        super(triggerConditions, triggerConditionValues)
    }

    evaluateTrigger(triggerContextMap){
        //distanz zu player dann true oder false1

        let triggerConditionsSatisfied = true;
        this.triggerConditionMap.array.forEach((key, value) => {
            switch(key){
                case 'radius':
                   let dx = triggerContextMap.get('enemyx') - triggerContextMap.get('playerx');
                   let dy = triggerContextMap.get('enemyy') - triggerContextMap.get('playery');
                   let distance = Math.sqrt(dx * dx + dy *dy);
                   triggerConditionsSatisfied = value > distance;
                   break;
                case 'attacked':
                    //check if enemy got attacked
                    break;
            }
        });
        return triggerConditionsSatisfied;

    }

}

export {AttackTrigger}