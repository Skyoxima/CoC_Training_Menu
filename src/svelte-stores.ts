import { readable, writable, type Writable } from "svelte/store";
import { type queueStateType, type ratesType } from '../typeDeclarations'


export const playButtonAudio = writable(0);     // it is counting how many times the click sound effect has been called, it's just a way to track a change
export const showMenu = writable(false);
export const showEntityInfo = writable(false);

export const activeTab = writable("training-tab");
export let rates: Writable<ratesType> = writable({"troop": 1, "spell": 1, "siege": 1});

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
}, () => {
  console.log('SpellQueueState was manually subscribed');
  return () => console.log('SpellQueueState was totally unsubscribed');
})

export const siegeQueueState: Writable<queueStateType> = writable({
  queued: {}, 
  currentCapacity: 0, 
  timeLeft: 0
}, () => {
  console.log('SiegeQueueState was manually subscribed');
  return () => console.log('SiegeQueueState was totally unsubscribed');
})

export const fullCapacities = readable({"troop": 320, "spell": 11, "siege": 6})
export const currencies = writable({
  "gems": 3000
});