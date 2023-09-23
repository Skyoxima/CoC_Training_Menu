<script lang="ts">
  import Menu from "./components/mainComponents/Menu.svelte";
  import AmbientMusic from "./components/auxiliaryComponents/MusicComponent/AmbientMusic.svelte";
  import InfoPopUp from "./components/auxiliaryComponents/InfoPopUp.svelte";
  import BgVideo from "./components/auxiliaryComponents/BgVideo.svelte";
  import ClickableBarracks from "./components/auxiliaryComponents/Interactables/ClickableBarracks.svelte";
  import { showMenu, playButtonAudio } from "./svelte-stores";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/motion";
  import ClickableDarkBarracks from "./components/auxiliaryComponents/Interactables/ClickableDarkBarracks.svelte";
  import ClickableSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableSpellFactory.svelte";
  let audioBind: HTMLAudioElement;
  let playButtonAudioUnsubscriber: Unsubscriber;
  
  // the Training queue management should also be global most likely (top level, here in the App component...)

  // global click audio player
  onMount(() => {
    audioBind.volume = 0.51;
    playButtonAudioUnsubscriber = playButtonAudio.subscribe(value => {
      if(value > 0)                // to not click on this onMount
        audioBind.play();
    });
  })

  onDestroy(() => {
    playButtonAudioUnsubscriber();
  })

</script>

<main>
  <div id="full-width">
    {#if $showMenu} <Menu /> {/if}
    <InfoPopUp />
    <AmbientMusic />
    <ClickableBarracks />
    <ClickableDarkBarracks />
    <ClickableSpellFactory />
    <BgVideo />
    <audio bind:this={audioBind} src="/src/assets/sound/button_click.ogg" preload="auto"></audio>
  </div>
</main>

<style>
  #full-width {
    position: relative;
    padding: 1rem;
    width: 100vw; height: 100vh;
    display: flex; justify-content: center; align-items: center;
  }
</style>