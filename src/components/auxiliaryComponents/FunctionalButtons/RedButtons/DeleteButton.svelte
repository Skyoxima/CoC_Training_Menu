<RedButton on:click={handleEntityDelete} whichButton="delete-btn" addnID="">
  <DeleteBtnImg />
</RedButton>
  

<script lang="ts">
  import RedButton from "./RedButton.svelte";
  import DeleteBtnImg from "../../../../assets/SVGASComponent/DeleteBtnImg.svelte";
  import { type Writable } from "svelte/store";
  import { type queueStateType } from "../../../../../typeDeclarations";
  import { updateClickAudio } from "../../../../functions"; 
  
  export let queueState: Writable<queueStateType>;
  

  // timers will have to be stopped too...
  function handleEntityDelete() {
    updateClickAudio();
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
