<div id="training-queue">
  {#each Object.entries($queueStore.queued) as [entityID, count], i}
    <QueueEntityBox
      entityID={entityID}
      entityType={Data[entityID].type}
      iconSource={Data[entityID].iconSource} 
      count={count}
      isFirstEntity={i === 0}
      makeDuration={Data[entityID].makeDuration}
      housingSpace={Data[entityID].housingSpace}
      queueStore={queueStore}
    />
  {/each}
</div>

<!-- There is the same queue active at a given time, only data passed to it changes depending on the tab selected (check Menu.svelte) -->
<script lang="ts">
  import { type Writable } from "svelte/store";
  import { type queueStateType, type siegeDataType, type spellDataType, type troopDataType } from "../../scripts/typeDeclarations";
  import QueueEntityBox from "./EntityBox/QueueEntityBox.svelte";

  export let queueStore: Writable<queueStateType>;
  export let Data: troopDataType | spellDataType | siegeDataType;       // Typescript will automatically only grant intellisense for common properties between the 3... for specific properties we'll need to narrow the type down 
  
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