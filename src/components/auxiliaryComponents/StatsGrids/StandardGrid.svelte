{#each Object.entries(statboxData) as [key, value]}
  {#if ['Movement Speed', 'Training Time', 'Housing Space', 'Spell Lifespan', 'Clone Lifespan'].includes(key)}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={100} statColor="blue" />
    {:else if ['Preferred Target', 'Attack Type', 'Targets', 'Radius'].includes(key) }
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={100} statColor="white" />
  {:else}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={fillPercentage} />
  {/if}
{/each}

<script lang="ts">
  import type { entityInfoToShowType, siegeDataSubType, spellDataSubType, troopDataSubType } from "../../../scripts/typeDeclarations";
  import StatBox from "../StatBox.svelte";
  import { entityInfoToShow } from "../../../scripts/svelte-stores";
  import { allTroops, allSpells } from "../../../scripts/entityLists";
  import { processData } from "../../../scripts/infoDataProcessor";

  const localEITS: entityInfoToShowType = $entityInfoToShow;
  const localEID = localEITS.entityID;
  let localED: troopDataSubType | spellDataSubType | siegeDataSubType;
  let statboxData: {[key: string]: any};    // should be typed
  let fillPercentage: number;

  if(allTroops.includes(localEID)) {
    localED = localEITS.entityData as troopDataSubType;
    statboxData = processData(localED, 'troop');
  } else if(allSpells.includes(localEID)) {
    localED = localEITS.entityData as spellDataSubType;
    statboxData = processData(localED, 'spell');
  } else {
    localED = localEITS.entityData as siegeDataSubType;
    statboxData = processData(localED, 'siege')
  }
  fillPercentage = (localED.currLevel / localED.maxLevel) * 100;
  
</script>

<!-- ! Add subtroop counts for golem, yeti, lavahound, witch etc. -->