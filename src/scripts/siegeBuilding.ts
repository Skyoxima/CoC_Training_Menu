import { intervalID, siegeQueueState, rates, currentlyMakingSiege } from "./svelte-stores";
import SiegeData from '../data/siegeData.json';
import type { siegeDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateNonSpellAudio } from "./functions";
import { intervalSetter } from "./heartFunctions";
const siegeData: siegeDataType = SiegeData;

function intervalSetterCover(siegeInMaking: string) {
  const siegeMakingIntervalID = intervalSetter(siegeQueueState, currentlyMakingSiege, siegeInMaking, siegeData[siegeInMaking].makeDuration, get(rates).siege, updateNonSpellAudio)
  intervalID.update(value => {
    value.siege = siegeMakingIntervalID;
    return value;
  })
}

const siegeQueueStateUnsubscriber = siegeQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0][0];
    if(topEntry !== get(currentlyMakingSiege).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyMakingSiege.set({
        entity: topEntry, 
        entityTimeLeft: siegeData[topEntry].makeDuration,
        entityMakeDuration: siegeData[topEntry].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID).siege);
      intervalSetterCover(topEntry);
    }
  } else {
    clearInterval(get(intervalID).siege);
  }
})

export { siegeQueueStateUnsubscriber }