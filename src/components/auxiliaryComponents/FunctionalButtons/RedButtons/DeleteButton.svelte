<RedButton on:click={handleEntityDelete} whichButton="delete-btn" addnID="">
  <DeleteBtnImg />
</RedButton>
  

<script lang="ts">
  import RedButton from "./RedButton.svelte";
  import DeleteBtnImg from "../../../../assets/SVGASComponent/DeleteBtnImg.svelte";
  import { type Writable } from "svelte/store";
  import { type queueManagerType, type queueStateType } from "../../../../scripts/typeDeclarations";
  import { updateClickAudio } from "../../../../scripts/functions"; 
  
  export let queueState: Writable<queueStateType>;
  export let queueManager: Writable<queueManagerType>
  
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
    queueManager.set({
        entity: 'n/a', 
        entityTimeLeft: 0,
        entityMakeDuration: 0,
        percentDone: '0%'
      });
  }
</script>
