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
    <audio bind:this={boostBind} src="/src/assets/sound/boost_activated.ogg" preload="auto"></audio>
  </div>
</main>

<script lang="ts">
  import Menu from "./components/mainComponents/Menu.svelte";
  import AmbientMusic from "./components/auxiliaryComponents/MusicComponent/AmbientMusic.svelte";
  import InfoPopUp from "./components/auxiliaryComponents/InfoPopUp.svelte";
  import BgVideo from "./components/auxiliaryComponents/BgVideo.svelte";
  import ClickableBarracks from "./components/auxiliaryComponents/Interactables/ClickableBarracks.svelte";
  import { showMenu, playButtonAudio, playNonSpellAudio, playSpellAudio, entitiesMadeState, rates, activeTab, intervalID, troopQueueState, spellQueueState, siegeQueueState, currentlyMakingTroop, currentlyMakingSpell, currentlyMakingSiege, playBoostAudio } from "./scripts/svelte-stores";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/motion";
  import ClickableDarkBarracks from "./components/auxiliaryComponents/Interactables/ClickableDarkBarracks.svelte";
  import ClickableSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableSpellFactory.svelte";
  import ClickableDarkSpellFactory from "./components/auxiliaryComponents/Interactables/ClickableDarkSpellFactory.svelte";
  import ClickableWorkshop from "./components/auxiliaryComponents/Interactables/ClickableWorkshop.svelte";
  import './scripts/troopTraining';
  import './scripts/spellBrewing';
  import './scripts/siegeBuilding';
  import { troopQueueStateUnsubscriber } from "./scripts/troopTraining";
  import { spellQueueStateUnsubscriber } from "./scripts/spellBrewing";
  import { siegeQueueStateUnsubscriber } from "./scripts/siegeBuilding";
  import { intervalSetter } from "./scripts/heartFunctions";
  import { updateNonSpellAudio, updateSpellAudio } from "./scripts/functions";

  let buttonClickBind: HTMLAudioElement;
  let troopAndSiegeMadeBind: HTMLAudioElement;
  let spellBrewedBind: HTMLAudioElement;
  let boostBind: HTMLAudioElement;

  let playButtonAudioUnsubscriber: Unsubscriber;      // cause the unsubscriber is in the onMount closure
  let playNonSpellAudioUnsubscriber: Unsubscriber;      
  let playSpellAudioUnsubscriber: Unsubscriber;      
  let playBoostAudioUnsubscriber: Unsubscriber;      
  
  // global click audio player
  onMount(() => {
    buttonClickBind.volume = 0.31;
    playButtonAudioUnsubscriber = playButtonAudio.subscribe(value => {
      if(value > 0)                // to not click on this onMount
        buttonClickBind.play();
    });

    troopAndSiegeMadeBind.volume = 0.31;
    playNonSpellAudioUnsubscriber = playNonSpellAudio.subscribe(value => {
      if(value > 0)
      troopAndSiegeMadeBind.play();
  });
  
  spellBrewedBind.volume = 0.31;
  playSpellAudioUnsubscriber = playSpellAudio.subscribe(value => {
    if(value > 0)
      spellBrewedBind.play();
    });

  boostBind.volume = 0.31;
  playBoostAudioUnsubscriber = playBoostAudio.subscribe(value => {
    if(value > 0)
      boostBind.play();
    });
  })

  const entitiesMadeStateUnsub = entitiesMadeState.subscribe(state => {
    console.log(state);
  })

  //! To apply the new rate we have to cancel the old one and start the new one immediately
  // avoid on setting up an interval on loading, this change should only apply when there is something in the making... on rest if boost is activated then it will anyways form a new interval and take the boosted rate
  const ratesUnsub = rates.subscribe(value => {
    if($activeTab === 'training-tab') {
      if($currentlyMakingTroop.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.troop);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.troop = intervalSetter(troopQueueState, currentlyMakingTroop, $currentlyMakingTroop.entity, $currentlyMakingTroop.entityMakeDuration, value.troop, updateNonSpellAudio)
          return state;
        }) 
      }
    }
    else if($activeTab === 'spells-tab') {
      if($currentlyMakingSpell.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.spell);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.spell = intervalSetter(spellQueueState, currentlyMakingSpell, $currentlyMakingSpell.entity, $currentlyMakingSpell.entityMakeDuration, value.spell, updateSpellAudio)
          return state;
        }) 
      }
    }
    else {
      if($currentlyMakingSiege.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.siege);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.siege = intervalSetter(siegeQueueState, currentlyMakingSiege, $currentlyMakingSiege.entity, $currentlyMakingSiege.entityMakeDuration, value.siege, updateNonSpellAudio)
          return state;
        }) 
      }
    }
  });

  onDestroy(() => {
    playButtonAudioUnsubscriber();
    playNonSpellAudioUnsubscriber();
    playSpellAudioUnsubscriber();
    playBoostAudioUnsubscriber();
    troopQueueStateUnsubscriber();
    spellQueueStateUnsubscriber();
    siegeQueueStateUnsubscriber();
    entitiesMadeStateUnsub();
    ratesUnsub();
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