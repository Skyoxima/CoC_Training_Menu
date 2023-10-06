import { readable, writable, type Writable, type Readable } from "svelte/store";
import { type entityInfoToShowType, type intervalIDType, type madeEntitiesStateType, type queueManagerType, type queueStateType, type ratesType } from './typeDeclarations'

export const playButtonAudio = writable(0);     // it is counting how many times the click sound effect has been called, it's just a way to track a change
export const showMenu = writable(false);
export const showEntityInfo = writable(false);
export const playNonSpellAudio = writable(0);
export const playSpellAudio = writable(0);
export const playBoostAudio = writable(0);

export const infoPopUp = writable({
  infoPopUpClass: "inactive",
  infoTxt: "Lorem Ipsum",
  infoPopUpWidth: "small"
});

export const entityInfoToShow: Writable<entityInfoToShowType> = writable({
  "entityID": 'n/a',
  "entityData": {},
  "entityType": "n/a"
})

export const intervalID: Writable<intervalIDType> = writable({troop: -1, spell: -1, siege: -1});

export const activeTab = writable("training-tab");
export let rates: Writable<ratesType> = writable({"troop": 1, "spell": 10, "siege": 100});      // realistic is 1, 1, 1
export let initialRates: Readable<ratesType> = readable({"troop": 1, "spell": 10, "siege": 100})

export const troopQueueState: Writable<queueStateType> = writable({
  queued: {}, 
  currentCapacity: 0, 
  timeLeft: 0
}, () => {
  // here for debugging purposes, once the app is completed, delete them
  console.log('TroopQueueState was manually subscribed');
  return () => console.log('TroopQueueState was totally unsubscribed');
})

export const spellQueueState: Writable<queueStateType> = writable({
  queued: {}, 
  currentCapacity: 0, 
  timeLeft: 0
})

export const siegeQueueState: Writable<queueStateType> = writable({
  queued: {}, 
  currentCapacity: 0, 
  timeLeft: 0
})

//~ primarily used to send the current training progress to the queueEntityBox's elements
export const currentlyMakingTroop: Writable<queueManagerType> = writable({
  entity: 'n/a', 
  entityTimeLeft: 0,
  entityMakeDuration: 0,
  percentDone: '0%'
})

export const currentlyMakingSpell: Writable<queueManagerType> = writable({
  entity: 'n/a', 
  entityTimeLeft: 0,
  entityMakeDuration: 0,
  percentDone: '0%'
})

export const currentlyMakingSiege: Writable<queueManagerType> = writable({
  entity: 'n/a', 
  entityTimeLeft: 0,
  entityMakeDuration: 0,
  percentDone: '0%'
})

export const entitiesMadeState: Writable<madeEntitiesStateType> = writable({
  troops: {}, spells: {}, sieges: {}
})

export const fullCapacities = readable({"troop": 320, "spell": 11, "siege": 6})
export const currencies = writable({
  "gems": 3000
});