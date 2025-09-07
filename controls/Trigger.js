class Trigger{
    constructor(triggerCondition, triggerConditionValue){
        this.triggerConditionMap = new Map(triggerCondition.map((key, i) => [key, triggerConditionValue[i]]));
    }

    evaluateTrigger(triggerContext){

    }

}

export {Trigger}