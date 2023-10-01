<div id="entity-grid-container" class={isSiegeData(Data) ? "siege-grid": ""} style="grid-template-columns: repeat({noofGridColumns}, 100px);">
  {#each Object.entries(Data) as [entityID, data] (entityID)}  <!-- neat! -->
    <GridEntityBox
      entityID={entityID}
      entityData={data}
      isDisabled={areDisabled.includes(entityID)} 
      on:click={() => handleQueueEntity(entityID)}
    />
  {/each}
</div>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { type Writable } from 'svelte/store';
  import type { queueStateType, siegeDataType, spellDataType, troopDataType } from '../../scripts/typeDeclarations';
  import GridEntityBox from './EntityBox/GridEntityBox.svelte';
  import { updateClickAudio, isTroopData, isSpellData, isSiegeData } from '../../scripts/functions';
  
  export let Data: troopDataType | spellDataType | siegeDataType;
  export let queueState: Writable<queueStateType>;
  export let entityFullCapacity: number;
  
  let areDisabled: string[] = []
  const entityHousingSpaces: {[key: string]: number} = {}      // you can use Record<keyType, valueType> as well, it is absolutely same as this
  const noofGridColumns = Math.ceil(Object.keys(Data).length / 2);

  for(const entity in Data) {
    entityHousingSpaces[entity] = Data[entity].housingSpace;
  }
  
  function manageEntitiesHousing(state: queueStateType) {
    let remainingCapacity: number;
    remainingCapacity = entityFullCapacity - state.currentCapacity;
    
    for(const entity in entityHousingSpaces) {
      // if -> disabling, else if -> re-enabling
      if(remainingCapacity < entityHousingSpaces[entity]) {
        areDisabled[areDisabled.length] = entity;  // since Svelte reactivity is based upon assignment and not array methods like push
      } else if(remainingCapacity >= entityHousingSpaces[entity] && areDisabled.includes(entity)) {
        const newDisabled = areDisabled.filter(item => item !== entity)
        areDisabled = newDisabled;  // again assignment is what will trigger reactivity
      }
    }
  }
  
  // any change to the queueState (caused from elsewhere) should activate this, therefore there shouldn't be a need to move it
  const queueStateUnsubscriber = queueState.subscribe(state => {
    manageEntitiesHousing(state);
  })

  function commonQueueUpdate(state: queueStateType, clickedEntityID: string) {
    state.currentCapacity += Data[clickedEntityID].housingSpace;
    state.timeLeft += Data[clickedEntityID].makeDuration;
  }

  function handleQueueEntity(clickedEntityID: string) {
    updateClickAudio();
    queueState.update(state => {
      if(state.queued[clickedEntityID] !== undefined) {
        state.queued[clickedEntityID]++;
      } else {
        state.queued[clickedEntityID] = 1
      }
      commonQueueUpdate(state, clickedEntityID);
      return state;
    })
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  });
</script>

<style>
  #entity-grid-container {
    height: 40%;
    display: grid;
    padding: 0.5rem;
    grid-auto-flow: column;
    /* grid-template-columns: repeat(21, 100px); */
    grid-template-rows: 1fr 1fr;
    align-items: center;
    place-items: center;
    column-gap: 5px;

    border-radius: 1rem;  
    box-shadow: inset 0 2px 0 0 rgba(var(--pure-black-rgb), 0.2), 0 2px 0 0 rgba(var(--pure-white-rgb), 1);
    background-color: rgba(var(--off-grey-rgb));

    overflow-x: scroll;
    scroll-behavior: smooth;
  }
  #entity-grid-container::-webkit-scrollbar {
    display: none;
  }


  #entity-grid-container.siege-grid {
    height: 40%;
    display: flex;
    padding: 0.5rem;
    gap: 1rem;
  }
</style>

<!-- >> You had made an error where you had two separate updates to the queueState store which triggered all the subscribers twice, instead now we refactored and call the common code inside both conditions -->
<!-- IDEA: laboratory should be integrated inside troop info, show a progression sort of...upgrade sprites and stuff could be shown in a cool way inside the troop's info dialogbox -->
