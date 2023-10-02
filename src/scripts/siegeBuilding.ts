import { intervalID, siegeQueueState, entitiesMadeState, rates, currentlyMakingSiege } from "./svelte-stores";
import SiegeData from '../data/siegeData.json';
import type { siegeDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateNonSpellAudio } from "./functions";

const siegeData: siegeDataType = SiegeData;

function addToMadeQueue(madeEntity: string) {
  entitiesMadeState.update(state => {
    if(state.sieges[madeEntity] !== undefined) {
      state.sieges[madeEntity]++;
    } else {
      state.sieges[madeEntity] = 1;
    }
    return state;
  })
}


function intervalSetter(siegeInMaking: string) {
  const siegeIntervalID = 
  setInterval(() => {
    siegeQueueState.update(state => {
      if(state.timeLeft > 0) {
        state.timeLeft--;
        currentlyMakingSiege.update(value => {
          value.entityTimeLeft--;
          value.percentDone = (100 - 100 * (value.entityTimeLeft / value.entityMakeDuration)).toFixed(2) + '%'
          return value;
        }
        );
      }

      if(get(currentlyMakingSiege).entityTimeLeft === 0) {
        // if there are more of the same entity, reduce count and reset the currentlyTraining back to this entity's makeDuration
        if(state.queued[siegeInMaking] > 1) {
          state.queued[siegeInMaking] -= 1;
          currentlyMakingSiege.update(state => {
            state.entityTimeLeft = siegeData[siegeInMaking].makeDuration;
            state.percentDone = '0%'
            return state;
          })
        } else {
          delete state.queued[siegeInMaking];
          clearInterval(get(intervalID).siege);
          currentlyMakingSiege.set({
            entity: 'n/a', 
            entityTimeLeft: 0, 
            entityMakeDuration: 0, 
            percentDone: '0%'
          });
        }
        addToMadeQueue(siegeInMaking);
        updateNonSpellAudio();
      }
      return state;
    })
  }, 1000 / get(rates).siege)
  
  intervalID.update(value => {
    value.siege = siegeIntervalID;
    return value;
  })
}

const siegeQueueStateUnsubscriber = siegeQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0];
    if(topEntry[0] !== get(currentlyMakingSiege).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyMakingSiege.set({
        entity: topEntry[0], 
        entityTimeLeft: siegeData[topEntry[0]].makeDuration,
        entityMakeDuration: siegeData[topEntry[0]].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID).siege);
      intervalSetter(topEntry[0]);
    }
  } else {
    clearInterval(get(intervalID).siege);
  }
})

export { siegeQueueStateUnsubscriber }