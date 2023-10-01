import { readable, writable, type Writable } from "svelte/store";
import { type megaQueueStateType, type queueStateType, type ratesType } from './typeDeclarations'


export const playButtonAudio = writable(0);     // it is counting how many times the click sound effect has been called, it's just a way to track a change
export const showMenu = writable(false);
export const showEntityInfo = writable(false);
export const playNonSpellAudio = writable(0);
export const playSpellAudio = writable(0);

//~ primarily used to send the current training progress to the queueEntityBox's elements
export const currentlyTraining = writable({
  entity: 'n/a', 
  entityTimeLeft: 0
})

export const intervalID: Writable<number> = writable(-1);

export const activeTab = writable("training-tab");
export let rates: Writable<ratesType> = writable({"troop": 2, "spell": 1, "siege": 1});

export const infoPopUp = writable({
  infoPopUpClass: "inactive",
  infoTxt: "Lorem Ipsum",
  infoPopUpWidth: "small"
})

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

export const entitiesMadeState: Writable<megaQueueStateType> = writable({
  troops: {}, spells: {}, sieges: {}
})

export const fullCapacities = readable({"troop": 320, "spell": 11, "siege": 6})
export const currencies = writable({
  "gems": 3000
});