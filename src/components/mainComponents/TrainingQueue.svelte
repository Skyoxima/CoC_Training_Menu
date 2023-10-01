<div id="training-queue">
  {#each Object.entries($queueStore.queued) as [entityID, count], i}
    <QueueEntityBox
      entityID={entityID}
      entityType={Data[entityID].type}
      iconSource={Data[entityID].iconSource} 
      count={count}
      entityMakeDuration={Data[entityID].makeDuration}
      isFirstEntity={i === 0}
      on:click={() => handleUnqueue(queueStore, entityID)}
    />
  {/each}
</div>

<!-- There is the same queue active at a given time, only data passed to it changes depending on the tab selected (check Menu.svelte) -->
<script lang="ts">
  import { type Writable } from "svelte/store";
  import { type queueStateType, type siegeDataType, type spellDataType, type troopDataType } from "../../scripts/typeDeclarations";
  import QueueEntityBox from "./EntityBox/QueueEntityBox.svelte";
  import { updateClickAudio, isTroopData, isSpellData } from "../../scripts/functions";
  import { currentlyTraining } from "../../scripts/svelte-stores";

  export let queueStore: Writable<queueStateType>;
  export let Data: troopDataType | spellDataType | siegeDataType;       // Typescript will automatically only grant intellisense for common properties between the 3... for specific properties we'll need to narrow the type down 
  
  // common for all queue data hence defined here

  function commonUnqueueUpdate(state: queueStateType, entityID: string, timeToSubtract: undefined | number = undefined) {
    state.currentCapacity -= Data[entityID].housingSpace;
    const currentEntities = Object.entries(state.queued);
    if(currentEntities.length === 0)
      state.timeLeft = 0;
    else
      state.timeLeft -= (timeToSubtract || Data[entityID].makeDuration);       
  }
  //! here is a special case for when it is the last entity that has been unqueued  it should reset the queueState.timeLeft, not simply minus
  //! an even more important special case is when training is going on

  // no additional checks required here as this will only run when there is atleast one entity in the queueState and its '-' btn is clicked
  function handleUnqueue(queueStore: Writable<queueStateType>, entityID: string) {
    updateClickAudio();
    queueStore.update(state => {
      if(state.queued[entityID] > 1) {
        state.queued[entityID]--;
        commonUnqueueUpdate(state, entityID);
      } else {
        delete state.queued[entityID];
        commonUnqueueUpdate(state, entityID, $currentlyTraining.entityTimeLeft);
      }
      return state;
    })
  }
</script>

<style>
  #training-queue {
    width: 100%; height: 18%;
    padding: 0 0.5rem;
    display: flex; justify-content: end; align-items: center;
    gap: 1rem; flex-direction: row-reverse;
    
    box-shadow: inset 0 2px 0 0 rgba(var(--pure-black-rgb), 0.2), 0 2px 0 0 rgba(var(--pure-white-rgb), 1);
    background-color: rgba(var(--off-grey-rgb));
    border-radius: 1rem;

    overflow-x: scroll;
  }
  #training-queue::-webkit-scrollbar {
    display: none;
  }
</style>