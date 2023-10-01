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
    <audio bind:this={buttonClickBind} src="/src/assets/sound/button_click.ogg" preload="auto"></audio>
    <audio bind:this={troopAndSiegeMadeBind} src="/src/assets/sound/Troop_Trained.ogg" preload="auto"></audio>
    <audio bind:this={spellBrewedBind} src="/src/assets/sound/Spell_Brewed.ogg" preload="auto"></audio>
  </div>
</main>

<script lang="ts">
  import Menu from "./components/mainComponents/Menu.svelte";
  import AmbientMusic from "./components/auxiliaryComponents/MusicComponent/AmbientMusic.svelte";
  import InfoPopUp from "./components/auxiliaryComponents/InfoPopUp.svelte";
  import BgVideo from "./components/auxiliaryComponents/BgVideo.svelte";
  import ClickableBarracks from "./components/auxiliaryComponents/Interactables/ClickableBarracks.svelte";
  import { showMenu, playButtonAudio, playNonSpellAudio, playSpellAudio } from "./scripts/svelte-stores";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/motion";
  import ClickableDarkBarracks from "./components/auxiliaryComponents/Interactables/ClickableDarkBarracks.svelte";
  import ClickableSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableSpellFactory.svelte";
  import ClickableDarkSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableDarkSpellFactory.svelte";
  import ClickableWorkshop from "./components/auxiliaryComponents/Interactables/ClickableWorkshop.svelte";
  import './scripts/troopTraining';
  import { troopQueueStateUnsubscriber } from "./scripts/troopTraining";

  let buttonClickBind: HTMLAudioElement;
  let troopAndSiegeMadeBind: HTMLAudioElement;
  let spellBrewedBind: HTMLAudioElement;

  let playButtonAudioUnsubscriber: Unsubscriber;      // cause the unsubscriber is in the onMount closure
  let playNonSpellAudioUnsubscriber: Unsubscriber;      
  let playSpellAudioUnsubscriber: Unsubscriber;      
  
  // global click audio player
  onMount(() => {
    buttonClickBind.volume = 0.51;
    playButtonAudioUnsubscriber = playButtonAudio.subscribe(value => {
      if(value > 0)                // to not click on this onMount
        buttonClickBind.play();
    });

    troopAndSiegeMadeBind.volume = 0.51;
    playNonSpellAudioUnsubscriber = playNonSpellAudio.subscribe(value => {
      if(value > 0)
      troopAndSiegeMadeBind.play();
  });
  
  spellBrewedBind.volume = 0.51;
  playSpellAudioUnsubscriber = playSpellAudio.subscribe(value => {
    if(value > 0)
      spellBrewedBind.play();
    });
  })

  onDestroy(() => {
    playButtonAudioUnsubscriber();
    playNonSpellAudioUnsubscriber();
    playSpellAudioUnsubscriber();
    troopQueueStateUnsubscriber();
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