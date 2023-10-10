{#each Object.entries(statboxData) as [key, value]}
  {#if ['Movement Speed', 'Training Time', 'Housing Space'].includes(key)}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={100} statColor="blue" />
    {:else if key === 'Preferred Target'}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={100} statColor="white" />
  {:else}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={fillPercentage}/>
  {/if}
{/each}

<script lang="ts">
  import type { entityInfoToShowType, siegeDataSubType, spellDataSubType, troopDataSubType } from "../../../scripts/typeDeclarations";
  import StatBox from "../StatBox.svelte";
  import { entityInfoToShow } from "../../../scripts/svelte-stores";
  import { allTroops, allSieges, allSpells } from "../../../scripts/entityLists";

  const localEITS: entityInfoToShowType = $entityInfoToShow;
  const localEID = localEITS.entityID, localET = localEITS.entityType;
  let localED: troopDataSubType | spellDataSubType | siegeDataSubType;
  let statboxData: {[key: string]: any};
  const statIcons = { 'hp': "/src/assets/icons/stat_icons/hp.png",
                      'damage': "/src/assets/icons/stat_icons/damage.png",
                      'speed': "/src/assets/icons/stat_icons/speed.png",
                      'time': "/src/assets/icons/stopwatch.png",
                      'housing': "/src/assets/icons/stat_icons/troop_silhouette.png"
                    }
  let fillPercentage: number;

  if(allTroops.includes(localEID)) {
    localED = localEITS.entityData as troopDataSubType;
    console.log(localED)
    statboxData = processData('troop');
    fillPercentage = (localED.currLevel / localED.maxLevel) * 100;

  } else if(allSpells.includes(localEID)) {
    localED = localEITS.entityData as spellDataSubType;
  } else {
    localED = localEITS.entityData as siegeDataSubType;
  }
    
  // the type and per-entity stats is insane...
  function processData(type: string) {
    let dataToShow: {[key: string]: any} = {};
    
    if(type === 'troop') {
      localED = localED as troopDataSubType;
      // all types of damages
      Object.entries(localED).forEach(([key, value]) => {
        if(['Damage', 'DPS', 'Secondary'].includes(key.split(' ')[0])) {
          dataToShow[`${key}`] = [(value as string[])[localED.currLevel - 1] || (value as string[])[localED.Level.indexOf(`${localED.currLevel}`)], statIcons['damage']];
        }
      })

      dataToShow['HP'] = [localED["Hitpoints"][localED.currLevel - 1] || localED["Hitpoints"][localED.Level.indexOf(`${localED.currLevel}`)], statIcons['hp']];
      dataToShow['Movement Speed'] = [localED["movementSpeed"], statIcons['speed']];
      dataToShow["Training Time"] = [convertToMins(localED.makeDuration), statIcons['time']]
    }
    dataToShow["Housing Space"] = [localED.housingSpace, statIcons['housing']];
    if(type === 'troop') {
      localED = localED as troopDataSubType;
      dataToShow["Preferred Target"] = [localED["preferredTarget"], 'no-icon']
    }
    return dataToShow;
  }

  function convertToMins(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60)
    return minutes === 0 ? `${seconds}s` : seconds !== 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
</script>