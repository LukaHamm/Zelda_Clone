import { EntityManager } from "./EntityManager.js"
import { IdleState } from "./IdleState.js"
import { WalkingState } from "./WalkingState.js"
import { MushroomEnemy } from "../model/MushroomEnemy.js";
import { EnemyStateMachine } from "./EnemyStateMachine.js";
import { CollisionDetector } from "../data/CollisionDetector.js";
import { State } from "./State.js";
class EnemyManager extends EntityManager {
    
    constructor(){
        super();
        this.entitiesStateBefore = [];
        this.lastTime=0;
        this.updateIntervall=2000;
    }

    copyEnemyStatesArray(){
        this.entitiesStateBefore = []
        this.entities.forEach(enemy => {
            let enemyCopy = new MushroomEnemy(enemy.x,enemy.y,enemy.width,enemy.height, enemy.id);
            let enemyStateCopy = this.copyState(enemy.stateMachine.state, enemyCopy);
            let enemyStateMachineCopy = new EnemyStateMachine(enemyStateCopy);
            enemyCopy.stateMachine = enemyStateMachineCopy;
            this.entitiesStateBefore.push(enemyCopy);
            //TODO Walking State kopieren
        })
    }


    copyState(state, enemyCopy){
        let copiedState;
        if(state instanceof WalkingState){
            copiedState = new WalkingState(enemyCopy,null,null,null);
        }
        if(state instanceof IdleState){
            copiedState = new IdleState(enemyCopy,null,null,null);
        }
        return copiedState;
    }


    copyTrigger(){
        
    }

    copyMovementPattern(pattern){
        if(pattern != null){
            
        }
    }

    manage(chunks,rootChunk,timeStamp, player){
        this.changeEnemyStates(chunks,rootChunk,timeStamp);
        this.entryState();
        this.enemyAction(timeStamp);
        this.detectCollision(player,rootChunk,chunks);
        this.cancelMovement();
        this.saveEnemyStates()    
    }

    //hier den Zeitschaltung einbauen oder im State selber fest reinkodieren, wann State geupdatet wird?
    changeEnemyStates(chunks, rootChunk, timestamp){
        if((timestamp-this.lastTime) > this.updateIntervall){
        this.entities.forEach(entity => {
            let triggerContextMap = new Map();
            let entityOldState =  this.entitiesStateBefore.length > 0 ? this.entitiesStateBefore.find(e => e.id === entity.id): null;
            if(entity.stateMachine.state instanceof WalkingState){
                triggerContextMap = this.extractTriggerContextIdle(entity.stateMachine.state, entity, entityOldState)
            }
            if(entity.stateMachine.state instanceof IdleState){
                triggerContextMap = this.extractTriggerContextWalk(entity.stateMachine.state)
            }
            entity.stateMachine.changeState(triggerContextMap)
        })

        this.lastTime=timestamp;
    }
    }

    detectCollision(player, rootChunk, chunks){
        let currentChunk;
        this.entities.forEach(entity=>{
            entity.isHit= false;
            chunks.forEach(chunk => {
                if(chunk.entityArray.some(chunkEntity => chunkEntity.id===entity.id)){
                    currentChunk= chunk;
                }
            })
            if(CollisionDetector.isCollision(currentChunk,entity.getHitBox(player),player)){
                entity.isHit = true;   
            }
            currentChunk.entityArray.forEach(chunkEntity => {
                if(!(chunkEntity instanceof MushroomEnemy)){
                if(CollisionDetector.isCollisionEntity(rootChunk, entity.getHitBox(player), chunkEntity.getHitBox(entity))){
                    entity.isHit=true;
                }
            }
            })
        })
    }

    cancelMovement(){
        this.entities.forEach(entity => {
            if(entity.stateMachine.state instanceof WalkingState /*auch füer attackstate*/){
                //rollback update
                if(entity.isHit){
                    entity.stateMachine.rollbackState()
                }

            }
        })
    }

    entryState(){
         this.entities.forEach(entity => {
            let entityOldState =  this.entitiesStateBefore.length > 0 ? this.entitiesStateBefore.find(e => e.id === entity.id): null;
            if(entityOldState == null){
                entity.stateMachine.entry();
            }else{
                let currentState = entity.stateMachine.state;
                let oldState = entityOldState.stateMachine.state;
                if(currentState.constructor !== oldState.constructor){
                    entity.stateMachine.entry();
                }
            }
         })
    }

    saveEnemyStates(){
        this.copyEnemyStatesArray();
    }

    enemyAction(timeStamp){
         this.entities.forEach(entity => {
            entity.stateMachine.enmeyAction(timeStamp);
         })
    }

    extractTriggerContextWalk(state){
        let triggerContextMap = new Map();
        state.trigger.triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'bool':
                triggerContextMap.set('bool', state.movementPattern.leaveIdle);
                break;
            }
        });
        return triggerContextMap;
    }

    extractTriggerContextIdle(state, entity, entitystateBefore){
        let triggerContextMap = new Map();
        state.trigger.triggerConditionMap.forEach((value, key) => {
            switch(key){
                case 'dx':
                    if(entitystateBefore == null){
                        triggerContextMap.set('dx', entity.x)
                    }else {
                        triggerContextMap.set('dx', entity.x - entitystateBefore.x)
                    }
                    break;
                case 'dy':
                     if(entitystateBefore == null){
                        triggerContextMap.set('dy', entity.y)
                    }else {
                        triggerContextMap.set('dy', entity.y - entitystateBefore.y)
                    }
                    break;
                case 'minxPosition':
                case 'minyPosition':
                case 'maxxPosition':
                case 'maxyPosition':
                    if(entitystateBefore != null){
                    let dx = entity.x-entitystateBefore.x;
                    let dy = entity.y-entitystateBefore.y;
                    if (dx == 0){
                        dy > 0? triggerContextMap.set('maxyPosition', entity.y+entity.stateMachine.state.movementPattern.movementSpeed):triggerContextMap.set('minyPosition', entity.y-entity.stateMachine.state.movementPattern.movementSpeed)
                    }
                    //nicht mit dy dx sondern mit schritt bei movement pattern
                     if (dy == 0){
                        dx > 0? triggerContextMap.set('maxxPosition', entity.x+entity.stateMachine.state.movementPattern.movementSpeed):triggerContextMap.set('minxPosition', entity.x-entity.stateMachine.state.movementPattern.movementSpeed)
                    }
                    }
                    break;
                

            }
        });
        return triggerContextMap;
    }

    extractTriggerContextAttack(){

    }
}

export { EnemyManager }