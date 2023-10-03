import { intervalID, troopQueueState, rates, currentlyMakingTroop } from "./svelte-stores";
import TroopData from '../data/troopData.json';
import type { troopDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateNonSpellAudio } from "./functions";
import { intervalSetter } from "./heartFunctions";

const troopData: troopDataType = TroopData;

function intervalSetterCover(troopInTraining: string) {
  const troopIntervalID = intervalSetter(troopQueueState, currentlyMakingTroop, troopInTraining, troopData[troopInTraining].makeDuration, get(rates).troop, updateNonSpellAudio)
  intervalID.update(value => {
    value.troop = troopIntervalID;
    return value;
  })
}

const troopQueueStateUnsubscriber = troopQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntryName = Object.entries(state.queued)[0][0];
    if(topEntryName !== get(currentlyMakingTroop).entity) {       // an entity is dequeued (auto), second one becomes the new first one
      //>> initialize the queueManager with the new entity
      currentlyMakingTroop.set({
        entity: topEntryName, 
        entityTimeLeft: troopData[topEntryName].makeDuration,
        entityMakeDuration: troopData[topEntryName].makeDuration,
        percentDone: '0%'
      });
      //>> clear any on-going interval
      clearInterval(get(intervalID).troop);
      //>> begin the making process by setting a new interval
      intervalSetterCover(topEntryName);
    }
  } else {
    //>> clear any residual interval that might be running (which after the last troop there is always one (of its own))
    clearInterval(get(intervalID).troop);
  }
})

export { troopQueueStateUnsubscriber }

//>> By my understanding so far, get is substitute of $ and in script portion of Svelte $ acts as a snapshot of store value at that instance (only in template it seems to act as a subscribe i.e reflects live change)