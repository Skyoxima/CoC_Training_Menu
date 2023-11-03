import { entitiesMadeState, activeTab } from "./svelte-stores";
import { get } from "svelte/store";
import { type Writable } from "svelte/store";
import type { queueStateType, queueManagerType } from "./typeDeclarations";
import { allTroops, allSpells, allSieges } from "./entityLists";      // this is the correct way, current tab one is wrong


//common for all 'making' scripts
export function addToMadeQueue(madeEntity: string, bulkNumbers = 0) {
  if(allTroops.includes(madeEntity)) {
    entitiesMadeState.update(state => {
      if(bulkNumbers > 1) {
        state.troops[madeEntity] = bulkNumbers;
      } else {
        if(state.troops[madeEntity] !== undefined) {
          state.troops[madeEntity]++;
        } else {
          state.troops[madeEntity] = 1;
        }
      }
      return state;
    });
  } else if(allSpells.includes(madeEntity)) {
    entitiesMadeState.update(state => {
      if(bulkNumbers > 1) {
        state.spells[madeEntity] = bulkNumbers
      } else {
        if(state.spells[madeEntity] !== undefined) {
          state.spells[madeEntity]++;
        } else {
          state.spells[madeEntity] = 1;
        }
      }
      return state;
    });
  } else {
    entitiesMadeState.update(state => {
      if(bulkNumbers > 1) {
        state.sieges[madeEntity] = bulkNumbers
      } else {
        if(state.sieges[madeEntity] !== undefined) {
          state.sieges[madeEntity]++;
        } else {
          state.sieges[madeEntity] = 1;
        }
      }
      return state;
    });
  }
}

export function intervalSetter(queueState: Writable<queueStateType>, queueManager: Writable<queueManagerType>, entityInMaking: string, entityMakeDuration: number, entityRate: number, jingleFunction: Function) {
  // console.log(entityRate);
  return setInterval(() => {
    queueState.update(state => {
      if(state.timeLeft > 0) {
        state.timeLeft--;
        queueManager.update(value => {
          value.entityTimeLeft--;
          value.percentDone = (100 - 100 * (value.entityTimeLeft / value.entityMakeDuration)).toFixed(2) + '%';
          return value;
        }
        );
      }

      if(get(queueManager).entityTimeLeft === 0) {
        if(state.queued[entityInMaking] > 1) {
          state.queued[entityInMaking] -= 1;
          queueManager.update(state => {
            //>> if there are more of the same entity, reduce count (of entity) and reset the currentlyTraining back to this entity's makeDuration
            state.entityTimeLeft = entityMakeDuration;
            state.percentDone = '0%'
            return state;
          })
        } else {
          delete state.queued[entityInMaking];
          //! resetting is very important, have implemented it in the handleUnqueue too...
          queueManager.set({
            entity: 'n/a', 
            entityTimeLeft: 0, 
            entityMakeDuration: 0, 
            percentDone: '0%'
          });
        }
        addToMadeQueue(entityInMaking);
        jingleFunction();
      }
      return state;
    })
  }, 1000 / entityRate)
}