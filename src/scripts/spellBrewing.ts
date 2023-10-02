import { intervalID, spellQueueState, entitiesMadeState, rates, currentlyMakingSpell } from "./svelte-stores";
import SpellData from '../data/spellData.json';
import type { spellDataType } from "./typeDeclarations";
import { get } from "svelte/store";
import { updateSpellAudio } from "./functions";

const spellData: spellDataType = SpellData;

function addToMadeQueue(madeEntity: string) {
  entitiesMadeState.update(state => {
    if(state.spells[madeEntity] !== undefined) {
      state.spells[madeEntity]++;
    } else {
      state.spells[madeEntity] = 1;
    }
    return state;
  })
}


function intervalSetter(spellInBrewing: string) {
  const spellIntervalID = 
  setInterval(() => {
    spellQueueState.update(state => {
      if(state.timeLeft > 0) {
        state.timeLeft--;
        currentlyMakingSpell.update(value => {
          value.entityTimeLeft--;
          value.percentDone = (100 - 100 * (value.entityTimeLeft / value.entityMakeDuration)).toFixed(2) + '%'
          return value;
        }
        );
      }

      if(get(currentlyMakingSpell).entityTimeLeft === 0) {
        // if there are more of the same entity, reduce count and reset the currentlyTraining back to this entity's makeDuration
        if(state.queued[spellInBrewing] > 1) {
          state.queued[spellInBrewing] -= 1;
          currentlyMakingSpell.update(state => {
            state.entityTimeLeft = spellData[spellInBrewing].makeDuration;
            state.percentDone = '0%'
            return state;
          })
        } else {
          delete state.queued[spellInBrewing];
          clearInterval(get(intervalID).spell);
          currentlyMakingSpell.set({
            entity: 'n/a', 
            entityTimeLeft: 0, 
            entityMakeDuration: 0, 
            percentDone: '0%'
          });
        }
        addToMadeQueue(spellInBrewing);
        updateSpellAudio();
      }
      return state;
    })
  }, 1000 / get(rates).spell)
  
  intervalID.update(value => {
    value.spell = spellIntervalID;
    return value;
  })
}

const spellQueueStateUnsubscriber = spellQueueState.subscribe(state => {
  if(Object.keys(state.queued).length > 0) {
    const topEntry = Object.entries(state.queued)[0];
    if(topEntry[0] !== get(currentlyMakingSpell).entity) {       // an entity is dequeued, second one becomes the new first one
      currentlyMakingSpell.set({
        entity: topEntry[0], 
        entityTimeLeft: spellData[topEntry[0]].makeDuration,
        entityMakeDuration: spellData[topEntry[0]].makeDuration,
        percentDone: '0%'
      });
      clearInterval(get(intervalID).spell);
      intervalSetter(topEntry[0]);
    }
  } else {
    clearInterval(get(intervalID).spell);
  }
})

export { spellQueueStateUnsubscriber }