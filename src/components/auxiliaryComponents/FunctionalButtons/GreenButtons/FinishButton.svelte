<script lang="ts">
  import GreenButton from "./GreenButton.svelte";
  import type { queueManagerType, queueStateType } from "../../../../scripts/typeDeclarations";
  import { type Writable } from "svelte/store";
  import { updateClickAudio, updateNonSpellAudio, updateSpellAudio } from "../../../../scripts/functions";
  import { activeTab, currencies } from "../../../../scripts/svelte-stores";
  import { addToMadeQueue } from "../../../../scripts/heartFunctions";

  export let queueState: Writable<queueStateType>;
  export let queueManager: Writable<queueManagerType>
  let skipCost: number;

  queueState.subscribe((state) => {
    skipCost = state.timeLeft <= 0 ? 0 : (Math.floor(state.timeLeft / 60) * 3) + 1;
  })

  function handleFinish() {
    updateClickAudio();
    if($activeTab === 'training-tab' || $activeTab === 'siege-tab')
      updateNonSpellAudio();
    else 
      updateSpellAudio();
    currencies.update(state => {
      state.gems -= skipCost;  
      return state;
    })

    // before emptying add it to the made queue
    if(Object.keys($queueState.queued).length > 0) {
      Object.entries($queueState.queued).forEach(element => {
        addToMadeQueue(element[0], element[1]);
      })
      queueState.update(state => {
        state.queued = {}
        state.timeLeft = 0;
        return state;
      });

      // reset step, very important
      queueManager.set({
        entity: 'n/a', 
        entityTimeLeft: 0,
        entityMakeDuration: 0,
        percentDone: '0%'
      });
    }
  }
</script>

<GreenButton on:click={handleFinish} isDisabled={skipCost == 0}>
  <div id="skip-training">
    {skipCost}
    <img width="24" src="/src/assets/icons/gem.png"  alt="gem" />
  </div>
</GreenButton>

<style>
  #skip-training {
    display: flex; justify-content: center; align-items: center; gap: 0.25rem;
  }
</style>