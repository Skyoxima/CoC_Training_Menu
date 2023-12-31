<script lang="ts">
  import { playCryAudio, showEntityInfo } from "../../scripts/svelte-stores";
  import ExitButton from "../auxiliaryComponents/FunctionalButtons/RedButtons/ExitButton.svelte";
  import StandardInfoGrid from "../auxiliaryComponents/StatsGrids/StandardInfoGrid.svelte";
  import { entityInfoToShow } from "../../scripts/svelte-stores";
  import { typeLvlSrcStyle } from "../../scripts/infoDataProcessor";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  
  const entityInfoToShowLocal = $entityInfoToShow;
  const returnedInfo = typeLvlSrcStyle(entityInfoToShowLocal)
  const imgClass = returnedInfo.generalType === 'spell' ? 'spell-adjustment' : '';
  let cryUnsub: Unsubscriber;
  let cryAudioBind: HTMLAudioElement;
  
  onMount(() => {
    cryAudioBind.volume = 0.4;
    cryUnsub = playCryAudio.subscribe((state) => {
      if(state.count > 0) {
        cryAudioBind.src = state.src;
        cryAudioBind.play();
      }
    })
  })

  onDestroy(() => {
    cryUnsub();
  })

  function processEntityName(entityID: string, entityType: string) {
    if(['elixir-troop', 'dark-elixir-troop', 'super-elixir-troop', 'super-dark-elixir-troop'].includes(entityType))
      if(entityID.slice(0, 2) === 's-' && entityID.slice(2) !== "goblin")
        return 'Super ' + entityID.slice(2, 3).toUpperCase() + entityID.slice(3)
      else if(entityID.slice(0, 2) === 's-' && entityID.slice(2) === "goblin")
        return 'Sneaky ' + entityID.slice(2, 3).toUpperCase() + entityID.slice(3)
      else if(entityID.slice(0, 2) === 'r-')
        return 'Rocket ' + entityID[2].toUpperCase() + entityID.slice(3)
      else if(entityID.slice(0, 2) === 'e-')
        return 'Electro ' + entityID[2].toUpperCase() + entityID.slice(3)
      else if(entityID.slice(0, 2) === 'i-')
        return 'Inferno ' + entityID[2].toUpperCase() + entityID.slice(3)
      else if(entityID.slice(0, 3) === 'app')
        return 'Apprentice Warden'
      else if(entityID.slice(0, 4) === 'lava')
        return "Lava " + entityID[4].toUpperCase() + entityID.slice(5)
      else if(entityID.slice(0, 3) === 'ice')
        return "Ice " + entityID[3].toUpperCase() + entityID.slice(4)
      else if(entityID.slice(entityID.length - 5) === 'rider') {
        return entityID[0].toUpperCase() + entityID.slice(1, entityID.length - 5) + " Rider"    // dragonrider, hogrider
      }

    if(['dark-elixir-spell', 'elixir-spell'].includes(entityType))
      return entityID[0].toUpperCase() + entityID.slice(1) + ' Spell';

    if(entityType === 'siege-machine') {
      const parts = entityID.split('-');
      return parts[0][0].toUpperCase() + parts[0].slice(1) + ' ' + parts[1][0].toUpperCase() + parts[1].slice(1)
    }
    return entityID[0].toUpperCase() + entityID.slice(1)
  }
</script>

<div id="information">
  <div id="top-container">
    <h2 id="entity-title" style="text-align: center;">{processEntityName(entityInfoToShowLocal.entityID, entityInfoToShowLocal.entityType) + ` (Level ${returnedInfo.level})`}</h2>
    <ExitButton addnID="info-exit-btn" storeOfClosingMenu={showEntityInfo} />
  </div>  
  <div id="inner-info-container">
    <div id="entity-portrait-container" class={`${returnedInfo.portraitStyle}`}>
      <img src={`${returnedInfo.portraitSrc}`} class={imgClass} alt="Entity">
    </div>
    <div id="entity-stats-container">
      <div id="stats-grid">
        <StandardInfoGrid />
      </div>
    </div>
  </div>
  <audio bind:this={cryAudioBind}></audio>
</div>

<style>
  #information {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 65%; height: 80%;

    border: 5px solid transparent;
    background: linear-gradient(rgba(var(--pure-dark-grey-rgb)), rgba(var(--pure-dark-grey-rgb))) padding-box, 
                linear-gradient(to top, rgba(var(--pure-dark-grey-rgb)) 0% 95%, rgba(var(--off-white-rgb), 0.7) 98.5%) border-box;
    border-radius: 1rem;
    z-index: 1001;
    overflow: hidden;
  }

  #top-container {
    position: relative;
    height: 8%;
    padding: 0.5rem;
    overflow: hidden;
  }
  #top-container::before {
    content: '';
    position: absolute;
    width: 100%; height: 40%;
    top: 0; left: 0;
    background: rgba(var(--pure-grey-rgb));
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    z-index: -1;
  }

  #inner-info-container {
    position: relative;
    width: 100%; height: 92%;      /* to compensate for the in-place top translation */
    padding: 0.5rem;
    display: flex;  gap: 1rem;

    background: var(--off-white-hex);
    border-radius: 10px;
  }

  #inner-info-container #entity-portrait-container {
    position: relative;
    width: 40%; height: 100%;
    
    border-radius: 1rem;
    background-size: 40% 1000px;
    background: rgba(var(--off-grey-rgb), 0.5);
    box-shadow: inset 2px 2px 0 0 rgba(var(--pure-black-rgb), 0.3), inset -2px -2px 0 0 rgba(var(--pure-white-rgb), 0.5);
  } #inner-info-container #entity-portrait-container.elixir {
    background: linear-gradient(to top, var(--elixir-dark-alternate), var(--elixir-light-alternate), transparent);
  } #inner-info-container #entity-portrait-container.dark-elixir {
    background: linear-gradient(to top, var(--dark-elixir-dark-alternate), var(--dark-elixir-light-alternate), transparent);
  } #inner-info-container #entity-portrait-container.gold {
    background: linear-gradient(to top, var(--gold-dark-alternate), var(--gold-light-alternate), transparent);
    box-shadow: 0 0 0 3px darkred;
  } #inner-info-container #entity-portrait-container.super-elixir {
    background: linear-gradient(to top, var(--super-troop-light-alternate), var(--super-troop-dark-alternate), transparent);
    box-shadow: inset 0 0 0 3px gold;
  } #inner-info-container #entity-portrait-container.super-dark-elixir {
    background: linear-gradient(to top, var(--dark-super-troop-light-alternate), var(--dark-super-troop-dark-alternate), transparent);
    box-shadow: inset 0 0 0 3px gold;
  } #inner-info-container #entity-portrait-container.lightning {
    background: linear-gradient(to top, rgba(var(--spell-lightning-dark-rgb)), rgba(var(--spell-lightning-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.heal {
    background: linear-gradient(to top, rgba(var(--spell-heal-dark-rgb)), rgba(var(--spell-heal-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.rage {
    background: linear-gradient(to top, rgba(var(--spell-rage-dark-rgb)), rgba(var(--spell-rage-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.jump {
    background: linear-gradient(to top, rgba(var(--spell-jump-dark-rgb)), rgba(var(--spell-jump-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.invisibility {
    background: linear-gradient(to top, rgba(var(--spell-invisibility-dark-rgb)), rgba(var(--spell-invisibility-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.recall {
    background: linear-gradient(to top, rgba(var(--spell-recall-dark-rgb)), rgba(var(--spell-recall-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.poison {
    background: linear-gradient(to top, rgba(var(--spell-poison-dark-rgb)), rgba(var(--spell-poison-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.eq {
    background: linear-gradient(to top, rgba(var(--spell-eq-dark-rgb)), rgba(var(--spell-eq-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.haste {
    background: linear-gradient(to top, rgba(var(--spell-haste-dark-rgb)), rgba(var(--spell-haste-light-rgb)), transparent);
  } #inner-info-container #entity-portrait-container.skeleton {
    background: linear-gradient(to top, rgba(var(--spell-skeleton-dark-rgb)), rgba(var(--spell-skeleton-light-rgb)), transparent);
  } 

  #inner-info-container #entity-portrait-container img {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-55%, -50%);     /* Some troops will need custom translations and sizes */
    width: 80%;
  } #inner-info-container #entity-portrait-container img.spell-adjustment {
    transform: translate(-50%, -50%);
    width: 60%;
    border-radius: 1.2rem;
    box-shadow: 0 10px 20px 0 rgba(var(--pure-black-rgb), 0.5);
  }

  #inner-info-container #entity-stats-container {
    width: 60%; height: 100%;
    padding: 0.5rem;

    overflow-y: scroll;

    border-radius: 1rem;
    box-shadow: inset 2px 2px 0 0 rgba(var(--pure-black-rgb), 0.1), inset -2px -2px 0 0 rgba(var(--pure-white-rgb), 0.75);
  } #inner-info-container #entity-stats-container::-webkit-scrollbar {
    display: none;
  }

  #stats-grid {
    width: 100%; height: 50%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>