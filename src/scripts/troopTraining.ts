import { intervalID, troopQueueState, spellQueueState, siegeQueueState, entitiesMadeState, rates, currentlyTraining } from "./svelte-stores";
import TroopData from '../data/troopData.json';
import type { queueStateType, troopDataType } from "./typeDeclarations";
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

// at every second change to the timeLeft causes the queueState subscription to trigger... how do I limit the unneccesary set-reset of intervals

function intervalSetter(troopInTraining: string) {
  intervalID.set( 
    setInterval(() => {
      troopQueueState.update(state => {
        if(state.timeLeft > 0) {
          state.timeLeft--;
          currentlyTraining.update(value => {
            value.entityTimeLeft--;
            value.percentDone = (100 - 100 * (value.entityTimeLeft / value.entityMakeDuration)).toFixed(2) + '%'
            return value;
          }
          );
        }

        if(get(currentlyTraining).entityTimeLeft === 0) {
          // if there are more of the same entity, reduce count and reset the currentlyTraining back to this entity's makeDuration
          if(state.queued[troopInTraining] > 1) {
            state.queued[troopInTraining] -= 1;
            currentlyTraining.update(state => {
              state.entityTimeLeft = troopData[troopInTraining].makeDuration;
              state.percentDone = '0%'
              return state;
            })
          } else {
            delete state.queued[troopInTraining];
            clearInterval(get(intervalID));
            currentlyTraining.set({
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
  )
}

const troopQueueStateUnsubscriber = troopQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0];
    if(topEntry[0] !== get(currentlyTraining).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyTraining.set({
        entity: topEntry[0], 
        entityTimeLeft: troopData[topEntry[0]].makeDuration,
        entityMakeDuration: troopData[topEntry[0]].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID));
      intervalSetter(topEntry[0]);
    }
  } else {
    clearInterval(get(intervalID));
  }
})

export { troopQueueStateUnsubscriber }