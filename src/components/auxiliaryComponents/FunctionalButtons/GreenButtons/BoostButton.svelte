<script lang="ts">
  import GreenButton from "./GreenButton.svelte";
  import { updateClickAudio } from "../../../../functions";
  function beginEntityBoosting() {
    updateClickAudio()
  }
</script>

<GreenButton on:click={beginEntityBoosting}>
  <div id="gem-speed-boost-div">
    Boost
    <img width="30" src="/src/assets/icons/stopwatch.png" alt="stopwatch"/>
  </div>
</GreenButton>

<style>
  #gem-speed-boost-div {
    display: flex; justify-content: center; align-items: center; gap: 0.25rem;
  }
</style>