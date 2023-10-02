<div class="entity-box-wrapper queue-entity-box-wrapper">
  <div id="{entityID}-q" class={`entity-box queue-entity-box ${entityType} ${isFirstEntity ? '': 'non-first'}`} data-count={`${count}x`}> <!--slightly different ID is for styling purposes only -->
    <img src={iconSource} alt={entityID}>
    <div class="training-progress" style="display: {isFirstEntity ? "block" : "none"}">
      <span class="progress-made" style="--percent-fill: {$queueManager.percentDone};"></span>
      <p class="time-left">{convertToMins($queueManager.entityTimeLeft)}</p>
    </div>
  </div>
  <button class="unqueue-troop top-right-btn" on:click={() => handleUnqueue(queueStore, entityID)}></button>      <!-- It is red but not a RedButton -->
</div>
<!-- ! Change to queueManager -->
<script lang="ts">
  import './EntityBox.css';
  import { updateClickAudio } from '../../../scripts/functions';
  import type { Writable } from 'svelte/store';
  import { type queueManagerType, type queueStateType } from '../../../scripts/typeDeclarations';

  export let entityID: string;    // image alts, specific styles (e.g spells)
  export let entityType: string;  // used for applying type-specific styles to queueEntityboxes
  export let iconSource: string;
  export let count: number;
  export let isFirstEntity: boolean;
  export let queueStore: Writable<queueStateType>;
  export let makeDuration: number;
  export let housingSpace: number;
  export let queueManager: Writable<queueManagerType>;

  function commonUnqueueUpdate(state: queueStateType, entityID: string, timeToSubtract = 0) {
    state.currentCapacity -= housingSpace;
    const currentEntities = Object.entries(state.queued);
    if(currentEntities.length === 0)
      state.timeLeft = 0;
    else {
      if(isFirstEntity) {
        state.timeLeft -= timeToSubtract;
      } else {
        state.timeLeft -= makeDuration;
      }
    }
  }
  //! here is a special case for when it is the last entity that has been unqueued  it should reset the queueState.timeLeft, not simply minus
  //! an even more important special case is when training is going on, if the current top one is dequeued then the time it has already spent training should be deducted, not whole time (when it is the only one left in its stack)

  // no additional checks required here as this will only run when there is atleast one entity in the queueState and its '-' btn is clicked
  function handleUnqueue(queueStore: Writable<queueStateType>, entityID: string) {
    updateClickAudio();
    queueStore.update(state => {
      if(state.queued[entityID] > 1) {
        state.queued[entityID]--;
        commonUnqueueUpdate(state, entityID);
      } else {
        delete state.queued[entityID];
        commonUnqueueUpdate(state, entityID, $queueManager.entityTimeLeft);
      }
      return state;
    })
  }

  function convertToMins(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - (minutes * 60)
    if(minutes == 0) {
      return `${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  }
</script>

<style>
  /* 2 classes to have it be more specific */ 
  .entity-box-wrapper.queue-entity-box-wrapper {
    width: auto;
    height: 85%; aspect-ratio: 1 / 1;
  }
  
  .queue-entity-box {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    overflow: hidden;
  } 
  .queue-entity-box.non-first {
    filter: brightness(0.8);
  }

  .queue-entity-box.siege-machine img {
    width: 85%; height: auto;
  }

  .queue-entity-box::before {
    content: attr(data-count);
    position: absolute;
    top: 7.5%; left: 2px;
    margin-top: -3px;

    font-size: 1rem;
    text-shadow: 0 2px 2px black;
    -webkit-text-stroke-width: 0;
  }

  .entity-box-wrapper .unqueue-troop {
    --red-shade-1-rgb: rgb(135, 2, 0);
    all: unset;
    position: absolute;
    top: 0.15rem; right: 0.15rem;
    width: 1rem; height: 1rem;

    background: linear-gradient(
        to top,
        var(--red-shade-1-rgb), 
        var(--red-shade-1-rgb)
      ) padding-box, 
      linear-gradient(
        to bottom, 
        tomato, 
        rgb(56, 0, 0)
      ) border-box;
    
    border: 2px solid transparent;
    border-radius: 0.25rem;
    box-shadow: 0 0 0px 1px tomato;
    color: white;
  }

  .unqueue-troop:active {
    scale: 0.9;
  }

  .entity-box-wrapper .unqueue-troop::before {
    content: '-';
    -webkit-text-stroke-width: 0;
  }

  .training-progress {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 20%;
    background: rgba(0, 0, 0, 0.3);
  }

  .training-progress .time-left {
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    text-shadow: 0 0.5px 2px rgba(var(--pure-black-rgb), 0.9);
  }

  .progress-made {
    position: absolute;
    top: 0; left: 0;
    width: 80%; height: 100%;
    width: var(--percent-fill);
    background: rgb(70, 190, 0);
  }
</style>