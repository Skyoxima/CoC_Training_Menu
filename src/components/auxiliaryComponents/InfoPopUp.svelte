<!--~ Any component should be able to change the text and size as needed, therefore used a store writable as this is a top-level component -->

<script lang="ts">
  import { infoPopUp } from "../../scripts/svelte-stores";
  const validWidths: Record<string, string> = {"small": "12rem", "medium": "18rem", "large": "24rem"}
</script>

<div id="info-pop-up" class={$infoPopUp.infoPopUpClass} style="--width: {validWidths[$infoPopUp.infoPopUpWidth]}">
  <p>{@html $infoPopUp.infoTxt}</p>  <!-- kinda neat -->
</div>

<style>
  #info-pop-up {
    position: fixed; 
    top: 0; left: 50%;
    padding: 0.5rem;
    display: flex; align-items: flex-end;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    width: var(--width);
    background: rgb(54, 0, 8);
    border-bottom: 2px solid rgb(199, 107, 122);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  #info-pop-up.inactive {
    transform: translateX(-50%) translateY(-100%);
  }
  #info-pop-up.active {
    transform: translateX(-50%) translateY(0%);
  }
  #info-pop-up > p {
    font-family: "Supercell-Magic", consolas;
    white-space: nowrap;
    -webkit-text-stroke-width: 0;
  }

</style>
