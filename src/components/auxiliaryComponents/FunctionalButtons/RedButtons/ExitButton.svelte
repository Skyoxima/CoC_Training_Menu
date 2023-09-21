<RedButton whichButton="exit-btn" on:click={handleExit} addnID={addnID}>
  <ExitBtnSVGSC />
</RedButton>

<script lang="ts">
  import RedButton from "./RedButton.svelte";
  import ExitBtnSVGSC from "../../../../assets/SVGASComponent/ExitBtnSVGSC.svelte";
  import { type Writable } from "svelte/store";
  import { updateClickAudio } from "../../../../functions";

  export let addnID: string;
  export let storeOfClosingMenu: Writable<boolean>;
  
  function handleExit() {
    updateClickAudio();         // as the component is Destroyed, this audiotag won't exist hence won't play therefore a delay is warranted before the Destroy
    setTimeout(() => {
      storeOfClosingMenu.set(false);
    }, 200)
  }
</script>
