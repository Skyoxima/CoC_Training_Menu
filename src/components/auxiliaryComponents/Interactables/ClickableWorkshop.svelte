<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, siegeQueueState, activeTab } from "../../../svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc: string;
  let glowingClass: string;

  const queueStateUnsubscriber = siegeQueueState.subscribe(state => {
    gifBackgroundSrc = `/src/assets/images/interactables/workshop/workshop_th12${state.currentCapacity > 0 ? "_glow.gif" : "_no_glow.png"}`
    glowingClass = `${state.currentCapacity > 0 ? "": "custom-glow"}`
  })

  onMount(() => {
    audioBind.volume = 0.7;
  })

  function handleBarracksClick() {
    audioBind.play();
    activeTab.set("siege-tab");
    showMenu.set(true); 
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  })
</script>

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-spell-factory" class="{glowingClass}" on:click={handleBarracksClick}>
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

  #clickable-spell-factory {
    background: none;
    border: none;
    position: absolute;
    top: 40.5%; left: 9.25%;
    width: 6.25rem; aspect-ratio: 1 / 1;
    background-image: var(--gifSrc);
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  #clickable-spell-factory.custom-glow {
    animation: subtle-glow 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  }
</style>

<!-- TODO: Make it responsive -->