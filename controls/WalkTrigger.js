class WalkingTrigger extends Trigger{

    static walkConditions = ['dx','dy','vx', 'vy']

    constructor(triggerConditions, triggerConditionValues){
        super(triggerConditions, triggerConditionValues)
    }

    evaluateTrigger(triggerContextMap){
        let triggerConditionsSatisfied = true;
        this.triggerConditionMap.array.forEach((key, value) => {
            switch(key){
                case 'dx':
                    triggerContextMap.get('dx') <= value;
                    triggerConditionsSatisfied = false;
                    break;
                case 'dy':
                   triggerContextMap.get('dy') <= value;
                    triggerConditionsSatisfied = false;
                    break;
            }
        });
        return triggerConditionsSatisfied;

    }
}

export {WalkingTrigger}