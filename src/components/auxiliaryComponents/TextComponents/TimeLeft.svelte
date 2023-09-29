<script lang="ts">
  import { onDestroy } from "svelte";
  import type { Writable } from 'svelte/store';
  import type { queueStateType } from "../../../scripts/typeDeclarations";
  import TextSmallInfo from "./TextSmallInfo.svelte"; 
  
  export let queueState: Writable<queueStateType>;
  
  let trainingTimeFinal = ""

  const stateUnsubscriber = queueState.subscribe(value => {
    convertToMins(value.timeLeft);
  })
  
  function convertToMins(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - (minutes * 60)
    trainingTimeFinal = `${minutes}m ${seconds}s`
  }

  onDestroy(() => {
    stateUnsubscriber();
  })
</script>

<div id="trainingTimeLeft">
  <TextSmallInfo displayText={trainingTimeFinal} iconSource="/src/assets/icons/stopwatch.png"/>
</div>

<!-- ! $store gives you a snapshot of the current values of the store, subscribing is like an eventListener, will always run when the store is modified -->