<script lang="ts">
  import GreenButton from "./GreenButton.svelte";
  import { updateBoostAudio, updateClickAudio } from "../../../../scripts/functions";  
  import { activeTab, rates } from "../../../../scripts/svelte-stores";
  
  export let boostAvailable: boolean;

  function beginEntityBoosting() {
    // updateClickAudio();
  updateBoostAudio();
      
    // realistic is 4x
    rates.update(value => {
      if($activeTab === 'training-tab') {
        value.troop *= 10;
      } else if($activeTab === 'spells-tab') {
        value.spell *= 10;
      } else {
        value.siege *= 10;
      }
      return value;
    })

  }
</script>

<GreenButton on:click={beginEntityBoosting} isDisabled={!boostAvailable}>
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