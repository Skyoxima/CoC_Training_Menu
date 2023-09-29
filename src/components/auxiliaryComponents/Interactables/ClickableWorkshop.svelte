<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, siegeQueueState, activeTab } from "../../../scripts/svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc: string;
  let glowingClass: string;

  const queueStateUnsubscriber = siegeQueueState.subscribe(state => {
    gifBackgroundSrc = `/src/assets/images/interactables/workshop/workshop_th12${state.currentCapacity > 0 ? "_working.gif" : "_no_glow.png"}`
    glowingClass = `${state.currentCapacity > 0 ? "": "custom-glow"}`
  })

  onMount(() => {
    audioBind.volume = 0.7;
  })

  function handleInteractableClick() {
    audioBind.play();
    activeTab.set("siege-tab");
    showMenu.set(true); 
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  })
</script>

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-workshop" class="{glowingClass}" on:click={handleInteractableClick}>
  <audio bind:this={audioBind} src="/src/assets/sound/Barracks_Pickup.ogg" preload="auto"></audio>
</button>
<img src="/src/assets/images/interactables/workshop/patch.png" alt="patch" id="patch">
<img src="/src/assets/images/interactables/workshop/plain_patch.png" alt="plain_patch" id="plain-patch">


<style>
  @keyframes subtle-glow {
    from {
      filter: drop-shadow(2px 2px 4px cyan) drop-shadow(-2px -2px 4px cyan);
    } to {
      filter: drop-shadow(5px 5px 7px cyan) drop-shadow(-5px -5px 7px cyan);
    }
  }

  #clickable-workshop {
    background: none;
    border: none;
    position: absolute;
    top: 39.5%; left: 9.25%;
    width: 6.75rem; aspect-ratio: 1 / 1;
    background-image: var(--gifSrc);
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
  }
  #clickable-workshop.custom-glow {
    animation: subtle-glow 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  }
  
  #patch {
    position: absolute;
    top: 36.5%; left: 3.5%;
    width: 16rem;
    filter: brightness(0.90);
    user-select: none;
  }
  
  #plain-patch {
    position: absolute;
    top: 44.5%; left: 9.75%;
    width: 8rem;
    filter: brightness(0.90);
    user-select: none;
  }
</style>
