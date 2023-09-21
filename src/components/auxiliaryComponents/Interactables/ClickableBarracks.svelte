<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, troopQueueState } from "../../../svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc = '/src/assets/images/barracks_th12_no_glow.gif';
  let glowingClass = "glowing";

  const queueStateUnsubscriber = troopQueueState.subscribe(state => {
    if(state.currentCapacity > 0) {
      gifBackgroundSrc = '/src/assets/images/interactables/barracks/barracks_th12_glow.gif';
      glowingClass = ""
    } else {
      gifBackgroundSrc = '/src/assets/images/interactables/barracks/barracks_th12_no_glow.gif';
      glowingClass = "glowing";
    }
  })

  onMount(() => {
    audioBind.volume = 0.1;
  })

  function handleBarracksClick() {
    audioBind.play();
    showMenu.set(true); 
    // set the tab to training, similarly do for clickable spell factory
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  })
</script>

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-barracks" class="{glowingClass}" on:click={() => handleBarracksClick()}>
  <audio bind:this={audioBind} src="/src/assets/sound/Barracks_Pickup.ogg" preload="auto"></audio>
</button>

<style>
  @keyframes subtle-glow {
    from {
      filter: drop-shadow(2px 2px 4px yellow) drop-shadow(-2px -2px 4px yellow);
    } to {
      filter: drop-shadow(5px 5px 7px yellow) drop-shadow(-5px -5px 7px yellow);
    }
  }

  #clickable-barracks {
    background: none;
    border: none;
    position: absolute;
    top: 72%; left: 66%;
    width: 4.5rem; aspect-ratio: 1 / 1;
    background-image: var(--gifSrc);
    background-position: center center;
    background-size: contain;
  }
  #clickable-barracks.glowing {
    animation: subtle-glow 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  }
</style>

<!-- TODO: Make it responsive -->