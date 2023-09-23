<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, troopQueueState, activeTab } from "../../../svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc: string;
  let glowingClass: string;

  const queueStateUnsubscriber = troopQueueState.subscribe(state => {
    gifBackgroundSrc = `/src/assets/images/interactables/dark_barracks/dark_barracks_th12${state.currentCapacity > 0 ? "_glow.gif" : "_no_glow.png"}`
    glowingClass = `${state.currentCapacity > 0 ? "": "custom-glow"}`
  })

  onMount(() => {
    audioBind.volume = 0.7;
  })

  function handleBarracksClick() {
    audioBind.play();
    activeTab.set("training-tab");
    showMenu.set(true); 
    // set the tab to training, similarly do for clickable spell factory
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  })
</script>

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-dark-barracks" class="{glowingClass}" on:click={handleBarracksClick}>
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

  #clickable-dark-barracks {
    background: none;
    border: none;
    position: absolute;
    top: 36.5%; right: 20.5%;
    width: 4.5rem; aspect-ratio: 1 / 1;
    background-image: var(--gifSrc);
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  #clickable-dark-barracks.custom-glow {
    animation: subtle-glow 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  }
</style>

<!-- TODO: Make it responsive -->