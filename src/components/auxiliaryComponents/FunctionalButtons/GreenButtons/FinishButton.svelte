<script lang="ts">
  import GreenButton from "./GreenButton.svelte";
  import type { queueStateType } from "../../../../../typeDeclarations";
  import { type Writable } from "svelte/store";
  import { updateClickAudio } from "../../../../functions";
  import { currencies } from "../../../../svelte-stores";

  export let queueState: Writable<queueStateType>;
  let skipCost: number;

  queueState.subscribe((state) => {
    skipCost = Math.floor(state.timeLeft / 60) * 3;
  })

  function handleFinish() {
    updateClickAudio();
    currencies.update(state => {
      state.gems -= skipCost;  
      return state;
    })

    if(Object.keys($queueState.queued).length > 0) {
      queueState.update(state => {
        state.queued = {}
        state.currentCapacity = 0;
        state.timeLeft = 0;
        return state;
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