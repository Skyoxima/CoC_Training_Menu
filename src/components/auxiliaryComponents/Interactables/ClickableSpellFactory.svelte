<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, spellQueueState, activeTab } from "../../../svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc: string;
  let glowingClass: string;

  const queueStateUnsubscriber = spellQueueState.subscribe(state => {
    gifBackgroundSrc = `/src/assets/images/interactables/spell_factory/spell_factory_th_12${state.currentCapacity > 0 ? "_brewing.gif" : "_no_glow.png"}`
    glowingClass = `${state.currentCapacity > 0 ? "": "custom-glow"}`
  })

  onMount(() => {
    audioBind.volume = 0.7;
  })

  function handleInteractableClick() {
    audioBind.play();
    activeTab.set("spells-tab");
    showMenu.set(true); 
  }

  onDestroy(() => {
    queueStateUnsubscriber();
  })
</script>

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-spell-factory" class="{glowingClass}" on:click={handleInteractableClick}>
  <audio bind:this={audioBind} src="/src/assets/sound/Spell_Factory_Pickup.ogg" preload="auto"></audio>
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
    top: 51.2%; left: 21.2%;
    width: 4.5rem; aspect-ratio: 1 / 1;
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