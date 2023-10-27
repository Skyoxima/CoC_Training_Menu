{#each Object.entries(statboxData) as [key, value]}
  {#if ['Movement Speed', 'Training Time', 'Housing Space'].includes(key)}
    <StatBox statTitle={key} statValue={`${value[0]}`} statIconSrc={`${value[1]}`} fillPercentage={100} statColor="blue" />
    {:else if ['Preferred Target', 'Attack Type', 'Targets'].includes(key) }
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
                      'heal1': "src/assets/icons/stat_icons/heal_troop.png",
                      'heal2': "src/assets/icons/stat_icons/heal_hero.png",
                      'damage': "/src/assets/icons/stat_icons/damage.png",
                      'speed': "/src/assets/icons/stat_icons/speed.png",
                      'time': "/src/assets/icons/stopwatch.png",
                      'housing': "/src/assets/icons/stat_icons/troop_silhouette.png",
                      'target': "/src/assets/icons/stat_icons/target.png"
                    }
  let fillPercentage: number;

  if(allTroops.includes(localEID)) {
    localED = localEITS.entityData as troopDataSubType;
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
      // all types of damages and healings
      Object.entries(localED).forEach(([key, value]) => {
        if(['Damage', 'DPS', 'Secondary', 'Aura'].includes(key.split(' ')[0])) {
          dataToShow[`${key}`] = [(value as string[])[localED.currLevel - 1] || (value as string[])[localED.Level.indexOf(`${localED.currLevel}`)], statIcons['damage']];
        } else if(['Healing'].includes(key.split(' ')[0])) {
          dataToShow[`${key}`] = [(value as string[])[localED.currLevel - 1] || (value as string[])[localED.Level.indexOf(`${localED.currLevel}`)], statIcons['heal1']];
        } else if(['HPS'].includes(key.split(' ')[0])) {
          dataToShow[`${key}`] = [(value as string[])[localED.currLevel - 1] || (value as string[])[localED.Level.indexOf(`${localED.currLevel}`)], statIcons['heal2']];
        }
      })

      dataToShow['HP'] = [localED["Hitpoints"][localED.currLevel - 1] || localED["Hitpoints"][localED.Level.indexOf(`${localED.currLevel}`)], statIcons['hp']];
      dataToShow['Movement Speed'] = [localED["movementSpeed"], statIcons['speed']];
      dataToShow["Training Time"] = [convertToMins(localED.makeDuration), statIcons['time']]
    }

    // separated for proper grid alignment
    dataToShow["Housing Space"] = [localED.housingSpace, statIcons['housing']];
    if(type === 'troop') {
      localED = localED as troopDataSubType;
      dataToShow["Preferred Target"] = [localED["preferredTarget"], statIcons['target']]
      dataToShow["Attack Type"] = [localED.attackType, statIcons['target']]
      dataToShow["Targets"] = [localED.targets, statIcons['target']]
    }
    return dataToShow;
  }

  function convertToMins(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60)
    return minutes === 0 ? `${seconds}s` : seconds !== 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
</script>