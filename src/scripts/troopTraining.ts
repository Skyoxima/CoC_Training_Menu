import { intervalID, troopQueueState, entitiesMadeState, rates, currentlyMakingTroop } from "./svelte-stores";
import TroopData from '../data/troopData.json';
import type { troopDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateNonSpellAudio } from "./functions";

const troopData: troopDataType = TroopData;

function addToMadeQueue(madeEntity: string) {
  entitiesMadeState.update(state => {
    if(state.troops[madeEntity] !== undefined) {
      state.troops[madeEntity]++;
    } else {
      state.troops[madeEntity] = 1;
    }
    return state;
  })
}

function intervalSetter(troopInTraining: string) {
  const troopIntervalID = setInterval(() => {
    troopQueueState.update(state => {
      if(state.timeLeft > 0) {
        state.timeLeft--;
        currentlyMakingTroop.update(value => {
          value.entityTimeLeft--;
          value.percentDone = (100 - 100 * (value.entityTimeLeft / value.entityMakeDuration)).toFixed(2) + '%'
          return value;
        }
        );
      }

      if(get(currentlyMakingTroop).entityTimeLeft === 0) {
        // if there are more of the same entity, reduce count and reset the currentlyTraining back to this entity's makeDuration
        if(state.queued[troopInTraining] > 1) {
          state.queued[troopInTraining] -= 1;
          currentlyMakingTroop.update(state => {
            state.entityTimeLeft = troopData[troopInTraining].makeDuration;
            state.percentDone = '0%'
            return state;
          })
        } else {
          delete state.queued[troopInTraining];
          clearInterval(get(intervalID).troop);
          currentlyMakingTroop.set({
            entity: 'n/a', 
            entityTimeLeft: 0, 
            entityMakeDuration: 0, 
            percentDone: '0%'
          });
        }
        addToMadeQueue(troopInTraining);
        updateNonSpellAudio();
      }
      return state;
    })
  }, 1000 / get(rates).troop)

  intervalID.update(value => {
    value.troop = troopIntervalID;
    return value;
  })
}

const troopQueueStateUnsubscriber = troopQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0];
    if(topEntry[0] !== get(currentlyMakingTroop).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyMakingTroop.set({
        entity: topEntry[0], 
        entityTimeLeft: troopData[topEntry[0]].makeDuration,
        entityMakeDuration: troopData[topEntry[0]].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID).troop);
      intervalSetter(topEntry[0]);
    }
  } else {
    clearInterval(get(intervalID).troop);
  }
})

export { troopQueueStateUnsubscriber }