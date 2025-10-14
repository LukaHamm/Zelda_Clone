import { EntityManager } from "./EntityManager.js"
import { IdleState } from "./IdleState.js"
import { WalkingState } from "./WalkingState.js"
class EnemyManager extends EntityManager {
    
    constructor(){
        this.entitiesStateBefore = [];
    }

    //hier den Zeitschaltung einbauen oder im State selber fest reinkodieren, wann State geupdatet wird?
    changeEnemyStates(chunks, rootChunk){
        this.entities.forEach(entity => {
            let triggerContextMap = new Map();
            let entityOldState =  this.entitiesStateBefore.length > 0 ? this.entitiesStateBefore.find(e => e.id === entity.id): null;
            if(entity.stateMachine.state instanceof WalkingState){
                triggerContextMap = this.extractTriggerContextIdle(entity.triggerConditionMap, entity, entityOldState)
            }
            if(entity.stateMachine.state instanceof IdleState){
                triggerContextMap = this.extractTriggerContextWalk(entity.triggerConditionMap, entity.stateMachine.state)
            }
        })
        entity.stateMachine.changeState(triggerContextMap)
    }


    entryState(){
         this.entities.forEach(entity => {
            let entityOldState =  this.entitiesStateBefore.length > 0 ? this.entitiesStateBefore.find(e => e.id === entity.id): null;
            if(entityOldState == null){
                entity.stateMachine.entry();
            }else{
                let currentState = entity.stateMachine.state;
                let oldState = entityOldState.stateMachine.state;
                if(currentState != oldState){
                    entity.stateMachine.entry();
                }
            }
         })
    }

    enemyAction(){
         this.entities.forEach(entity => {
            entity.stateMachine.enemyAction();
         })
    }

    extractTriggerContextWalk(triggerConditionMap, state){
        let triggerContextMap = new Map();
        triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'bool':
                triggerContextMap.set('bool', state.movementPattern.leaveIdle);
                break;
            }
        });
        return triggerContextMap;
    }

    extractTriggerContextIdle(triggerConditionMap, entity, entitystateBefore){
        let triggerContextMap = new Map();
        triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'dx':
                    if(entitystateBefore == null){
                        triggerContextMap.set('dx', entity.x)
                    }else {
                        triggerConditionMap.set('dx', entity.x - entitystateBefore.x)
                    }
                    break;
                case 'dy':
                     if(entitystateBefore == null){
                        triggerContextMap.set('dy', entity.y)
                    }else {
                        triggerConditionMap.set('dy', entity.y - entitystateBefore.y)
                    }
                    break;
            }
        });
        return triggerConditionMap;
    }

    extractTriggerContextAttack(){

    }
}