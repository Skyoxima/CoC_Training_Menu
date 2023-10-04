<main>
  <div id="full-width">
    {#if $showMenu} <Menu /> {/if}
    <InfoPopUp />
    <AmbientMusic />
    <Interactables />
    <BgVideo />
    <TopLevelAudio />
  </div>
</main>

<script lang="ts">
  import Menu from "./components/mainComponents/Menu.svelte";
  import AmbientMusic from "./components/auxiliaryComponents/MusicComponent/AmbientMusic.svelte";
  import InfoPopUp from "./components/auxiliaryComponents/InfoPopUp.svelte";
  import BgVideo from "./components/auxiliaryComponents/BgVideo.svelte";
  import TopLevelAudio from "./components/auxiliaryComponents/TopLevelAudio.svelte";
  import { showMenu, rates, activeTab, intervalID, troopQueueState, spellQueueState, siegeQueueState, currentlyMakingTroop, currentlyMakingSpell, currentlyMakingSiege } from "./scripts/svelte-stores";
  import { onDestroy } from "svelte";
  import './scripts/troopTraining';
  import './scripts/spellBrewing';
  import './scripts/siegeBuilding';
  import { troopQueueStateUnsubscriber } from "./scripts/troopTraining";
  import { spellQueueStateUnsubscriber } from "./scripts/spellBrewing";
  import { siegeQueueStateUnsubscriber } from "./scripts/siegeBuilding";
  import { intervalSetter } from "./scripts/heartFunctions";
  import { updateNonSpellAudio, updateSpellAudio } from "./scripts/functions";
  import Interactables from "./components/auxiliaryComponents/Interactables/Interactables.svelte";

  //! To apply the new rate we have to cancel the old one and start the new one immediately
  // avoid on setting up an interval on loading, this change should only apply when there is something in the making... on rest if boost is activated then it will anyways form a new interval and take the boosted rate
  const ratesUnsub = rates.subscribe(value => {
    if($activeTab === 'training-tab') {
      if($currentlyMakingTroop.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.troop);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.troop = intervalSetter( troopQueueState, 
                                        currentlyMakingTroop, 
                                        $currentlyMakingTroop.entity, 
                                        $currentlyMakingTroop.entityMakeDuration, 
                                        value.troop, 
                                        updateNonSpellAudio
                                      )
          return state;
        }) 
      }
    }
    else if($activeTab === 'spells-tab') {
      if($currentlyMakingSpell.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.spell);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.spell = intervalSetter( spellQueueState, 
                                        currentlyMakingSpell, 
                                        $currentlyMakingSpell.entity, 
                                        $currentlyMakingSpell.entityMakeDuration, 
                                        value.spell, 
                                        updateSpellAudio
                                      )
          return state;
        }) 
      }
    }
    else {
      if($currentlyMakingSiege.entity !== 'n/a') {      // if something is in the making
        clearInterval($intervalID.siege);
        intervalID.update(state => {
          // queue was not changed, so we can get necessary information from the queueManager itself
          state.siege = intervalSetter( siegeQueueState, 
                                        currentlyMakingSiege, 
                                        $currentlyMakingSiege.entity, 
                                        $currentlyMakingSiege.entityMakeDuration, 
                                        value.siege, 
                                        updateNonSpellAudio
                                      )
          return state;
        }) 
      }
    }
  });

  onDestroy(() => {
    troopQueueStateUnsubscriber();
    spellQueueStateUnsubscriber();
    siegeQueueStateUnsubscriber();
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