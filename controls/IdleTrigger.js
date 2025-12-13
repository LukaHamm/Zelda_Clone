import { Trigger } from "./Trigger.js";
class IdleTrigger extends Trigger {
    static idleConditions = ['dx', 'dy', 'vx', 'vy', 'minxPosition', 'minyPosition','maxxPosition','maxyPosition']

    constructor(triggerConditions, triggerConditionValues) {
        super(triggerConditions, triggerConditionValues)
    }

    evaluateTrigger(triggerContextMap) {
        let triggerConditionsSatisfied = true;
        this.triggerConditionMap.forEach((value, key) => {
            switch (key) {
                case 'dx':
                    if (triggerContextMap.get('dx') != value) {
                        triggerConditionsSatisfied = false;
                    }
                    break;
                case 'dy':
                    if (triggerContextMap.get('dy') != value) {
                        triggerConditionsSatisfied = false;
                    }
                    break;
                case 'minxPosition':
                    if (triggerContextMap.get('minxPosition') <= value) {
                        triggerConditionsSatisfied = true;
                    }
                case 'minyPosition':
                    if (triggerContextMap.get('minyPosition') <= value) {
                        triggerConditionsSatisfied = true;
                    }
                 case 'maxxPosition':
                    if (triggerContextMap.get('maxxPosition') >= value) {
                        triggerConditionsSatisfied = true;
                    }
                case 'maxyPosition':
                    if (triggerContextMap.get('maxyPosition') >= value) {
                        triggerConditionsSatisfied = true;
                    }
            }
        });
        return triggerConditionsSatisfied;
    }

}

export { IdleTrigger }
