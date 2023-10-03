import { intervalID, spellQueueState, rates, currentlyMakingSpell } from "./svelte-stores";
import SpellData from '../data/spellData.json';
import type { spellDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateSpellAudio } from "./functions";
import { intervalSetter } from "./heartFunctions";

const spellData: spellDataType = SpellData;

function intervalSetterCover(spellInBrewing: string) {
  const spellBrewingIntervalID = intervalSetter(spellQueueState, currentlyMakingSpell, spellInBrewing, spellData[spellInBrewing].makeDuration, get(rates).spell, updateSpellAudio)
  intervalID.update(value => {
    value.spell = spellBrewingIntervalID;
    return value;
  })
}

const spellQueueStateUnsubscriber = spellQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0][0];
    if(topEntry !== get(currentlyMakingSpell).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyMakingSpell.set({
        entity: topEntry, 
        entityTimeLeft: spellData[topEntry].makeDuration,
        entityMakeDuration: spellData[topEntry].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID).spell);
      intervalSetterCover(topEntry);
    }
  } else {
    clearInterval(get(intervalID).spell);
  }
})

export { spellQueueStateUnsubscriber }