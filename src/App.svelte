<main>
  <div id="full-width">
    {#if $showMenu} <Menu /> {/if}
    <InfoPopUp />
    <AmbientMusic />
    <ClickableBarracks />
    <ClickableDarkBarracks />
    <ClickableSpellFactory />
    <ClickableDarkSpellFactory />
    <ClickableWorkshop />
    <BgVideo />
    <audio bind:this={audioBind} src="/src/assets/sound/button_click.ogg" preload="auto"></audio>
  </div>
</main>

<script lang="ts">
  import Menu from "./components/mainComponents/Menu.svelte";
  import AmbientMusic from "./components/auxiliaryComponents/MusicComponent/AmbientMusic.svelte";
  import InfoPopUp from "./components/auxiliaryComponents/InfoPopUp.svelte";
  import BgVideo from "./components/auxiliaryComponents/BgVideo.svelte";
  import ClickableBarracks from "./components/auxiliaryComponents/Interactables/ClickableBarracks.svelte";
  import { showMenu, playButtonAudio } from "./scripts/svelte-stores";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/motion";
  import ClickableDarkBarracks from "./components/auxiliaryComponents/Interactables/ClickableDarkBarracks.svelte";
  import ClickableSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableSpellFactory.svelte";
  import ClickableDarkSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableDarkSpellFactory.svelte";
  import ClickableWorkshop from "./components/auxiliaryComponents/Interactables/ClickableWorkshop.svelte";
  import { troopQueueState, spellQueueState, siegeQueueState, entitiesMadeState } from "./scripts/svelte-stores";
  let audioBind: HTMLAudioElement;
  let playButtonAudioUnsubscriber: Unsubscriber;
  
  
  // global click audio player
  onMount(() => {
    audioBind.volume = 0.51;
    playButtonAudioUnsubscriber = playButtonAudio.subscribe(value => {
      if(value > 0)                // to not click on this onMount
        audioBind.play();
    });
  })

  troopQueueState.subscribe(state => {
    if(Object.keys(state.queued).length !== 0) {
      
    }
  })

  onDestroy(() => {
    playButtonAudioUnsubscriber();
  })

</script>

<style>
  #full-width {
    position: relative;
    padding: 1rem;
    width: 100vw; height: 100vh;
    display: flex; justify-content: center; align-items: center;
  }
</style>