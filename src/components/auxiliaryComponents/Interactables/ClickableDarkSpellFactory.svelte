<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { showMenu, spellQueueState, activeTab } from "../../../svelte-stores";
  let audioBind: HTMLAudioElement;
  let gifBackgroundSrc: string;
  let glowingClass: string;

  const queueStateUnsubscriber = spellQueueState.subscribe(state => {
    gifBackgroundSrc = `/src/assets/images/interactables/dark_spell_factory/dark_spell_factory_th12${state.currentCapacity > 0 ? "_brewing.gif" : "_no_glow.png"}`
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

<button style="--gifSrc: url({gifBackgroundSrc})" id="clickable-dark-spell-factory" class="{glowingClass}" on:click={handleInteractableClick}>
  <audio bind:this={audioBind} src="/src/assets/sound/Spell_Factory_Pickup.ogg" preload="auto"></audio>
</button>

<style>
  @keyframes subtle-glow {
    from {
      filter: drop-shadow(2px 2px 4px magenta) drop-shadow(-2px -2px 4px magenta);
    } to {
      filter: drop-shadow(5px 5px 7px magenta) drop-shadow(-5px -5px 7px magenta);
    }
  }

  #clickable-dark-spell-factory {
    background: none;
    border: none;
    position: absolute;
    top: 51.2%; right: 21%;
    width: 4.75rem; aspect-ratio: 1 / 1;
    background-image: var(--gifSrc);
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  #clickable-dark-spell-factory.custom-glow {
    animation: subtle-glow 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  }
</style>