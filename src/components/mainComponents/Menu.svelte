<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import { activeTab, fullCapacities, showEntityInfo, spellQueueState, troopQueueState, siegeQueueState, currentlyMakingTroop, currentlyMakingSpell, currentlyMakingSiege } from "../../scripts/svelte-stores";
  import type { troopDataType, spellDataType, siegeDataType } from "../../scripts/typeDeclarations";
  import MenuContents from "./MenuContents.svelte";
  import EntityInfoTab from "./EntityInfoTab.svelte";
  import TroopData from '../../data/troopData.json';
  import SpellData from '../../data/spellData.json';
  import SiegeData from '../../data/siegeData.json';
  import ArmyOverview from "./ArmyOverview.svelte";

  const troopData: troopDataType = TroopData;
  const spellData: spellDataType = SpellData;
  const siegeData: siegeDataType = SiegeData;

  
</script>

<div id="menu">
  <Toolbar />
  <div id="inner-container">
  {#if $activeTab === 'training-tab'}
    <MenuContents queueState={troopQueueState} Data={troopData} entityFullCapacity={$fullCapacities.troop} queueManager={currentlyMakingTroop}/>
  {:else if $activeTab === 'spells-tab'}
    <MenuContents queueState={spellQueueState} Data={spellData} entityFullCapacity={$fullCapacities.spell} queueManager={currentlyMakingSpell}/>
  {:else if $activeTab === 'siege-tab'}
    <MenuContents queueState={siegeQueueState} Data={siegeData} entityFullCapacity={$fullCapacities.siege} queueManager={currentlyMakingSiege}/>
  {:else if $activeTab === 'army-tab'}
    <ArmyOverview /> <!--! it will have to subscribe to all queue datas within -->
  {/if}
  </div>
</div>
{#if $showEntityInfo}
  <div id="blocker-div">
    <EntityInfoTab  />
  </div>
{/if}

<style>
  #menu {
    position: relative;
    width: 1200px;
    aspect-ratio: 21 / 10;

    border: 5px solid transparent;
    background: linear-gradient(rgba(var(--pure-dark-grey-rgb)), rgba(var(--pure-dark-grey-rgb))) padding-box, 
                linear-gradient(to top, rgba(var(--pure-dark-grey-rgb)) 0% 95%, rgba(var(--off-white-rgb), 0.7) 98.5%) border-box;
    border-radius: 1rem;
    overflow: hidden;
    z-index: 1000;
  }

  #inner-container {
    width: 100%; height: 91.05%;      /* to compensate for the in-place top translation */
    position: relative;
    top: -0.4rem;
    padding: 0.5rem;
    border-radius: 10px;

    /* border: 1px solid black; */
    background: var(--off-white-hex);
  }

  #blocker-div {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(var(--pure-black-rgb), 0.5);
    z-index: 1001;
  }
</style>