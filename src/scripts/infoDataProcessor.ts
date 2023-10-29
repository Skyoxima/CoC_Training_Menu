import type { entityInfoToShowType, infoTabDataType, siegeDataSubType, spellDataSubType, troopDataSubType } from "./typeDeclarations";
import { statIcons } from "./entityLists";

export function typeLvlSrcStyle(storeData: entityInfoToShowType) {
  let toReturn: infoTabDataType = {'generalType': 'troop', 'level': 0, 'portraitStyle': 'elixir', 'portraitSrc': ''};

  const typeSliced = storeData.entityType.split('-')
  if(typeSliced[0] === 'elixir')
    toReturn['portraitStyle'] = 'elixir';
  else if(typeSliced[0] === 'dark')
    toReturn['portraitStyle'] = 'dark-elixir';
  else if(typeSliced[0] === 'super' && typeSliced[1] === 'elixir')
    toReturn['portraitStyle'] = 'super-elixir';
  else if(typeSliced[0] === 'super' && typeSliced[1] === 'dark')
    toReturn['portraitStyle'] = 'super-dark-elixir';
  else if(typeSliced[0] === 'siege')
    toReturn['portraitStyle'] = 'gold';
  
  if(typeSliced[typeSliced.length - 1] === 'spell') {
    toReturn['generalType'] = 'spell';

    toReturn['portraitStyle'] = storeData.entityID;
    if(storeData.entityID === 'freeze' || storeData.entityID === 'clone')
      toReturn['portraitStyle'] = 'lightning';
    else if(storeData.entityID === 'earthquake')
      toReturn['portraitStyle'] = 'eq';
    else if(storeData.entityID === 'bat')
      toReturn['portraitStyle'] = 'rage';
  }
  const typedLocalED = storeData.entityData as troopDataSubType | spellDataSubType | siegeDataSubType
  toReturn['level'] = typedLocalED.currLevel;
  toReturn['portraitSrc'] = typedLocalED.modelSource;
  return toReturn;
}

export function processData(entityData: troopDataSubType | siegeDataSubType | spellDataSubType, type: string) {
  let dataToShow: {[key: string]: any} = {};
  
  if(type === 'troop') {
    entityData = entityData as troopDataSubType;
    // all types of damages and healings (progressive stats)
    Object.entries(entityData).forEach(([key, value]) => {
      if(['Damage', 'DPS', 'Secondary', 'Aura'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['damage']];
      } else if(['Healing'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['heal1']];
      } else if(['HPS'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['heal2']];
      }
    })
    // method to access string[] values above is used so that super troops' stats are retrieved correctly as well

    dataToShow['HP'] = [entityData["Hitpoints"][entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['hp']];
    dataToShow['Movement Speed'] = [entityData["movementSpeed"], statIcons['speed']];
  }
  
  else if(type === 'spell') {
    // essentially because of just icons difference I have to write these elaborate if-else, otherwise if value type === string[], then use key as dataToShow's key and get the value would have reduced a lot of work
    // possible maybe have a hashmap for just the key(validated as written above) and icon sources?
    Object.entries(entityData).forEach(([key, value]) => {
      // progressive stats
      if(['Damage', 'Max DPS'].includes(key))
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons[key === 'Max DPS' ? 'poison' : 'damage']]
      else if(['Total Healing', 'Healing per Pulse', 'Total Healing on Heroes'].includes(key))
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['Total Healing on Heroes' === key ? 'heal2': 'heal1']] 
      else if(key === 'Damage Increase') {
        dataToShow[`${key} (Additive)`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['attack2']];
        dataToShow['Hero Damage Increase'] = [parseInt(dataToShow['Damage Increase (Additive)']) / 2 + '%', statIcons['attack2']];
      }
      else if(key === 'Speed Increase' || key === 'Speed Decrease') {
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)] + '%', statIcons['speed']]
        if(key === 'Speed Increase')    // rage, haste have halving effect, poison doesn't
          dataToShow['Hero Speed Increase'] = [parseInt(dataToShow['Speed Increase']) / 2 + '%', statIcons['speed']];
      }
      else if(key === 'Cloned Capacity' || key === 'Recalled Capacity')
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['count']]
      else if(['Spell Duration', 'Freeze Time'].includes(key)) 
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['time']]
      else if(key === 'Attack Rate Decrease') {
        dataToShow[`Attack Rate Decrease`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['attack']]
      } else if(key === 'Radii')
        dataToShow[`Radius `] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['radius']]
      else if(key.split(" ")[1] === 'spawned')
        dataToShow[`${key}`] = [(value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons[key.split(" ")[0] === 'Bats' ? 'bats': 'skull']]

      // standalone stats
      else if(key === 'boostTime')
        dataToShow[`Boost Time`] = [value + "s", statIcons['time']]
    })
  }

  // common to all entities
  dataToShow["Training Time"] = [convertToMins(entityData.makeDuration), statIcons['time']]
  dataToShow["Housing Space"] = [entityData.housingSpace, statIcons['housing']];
  
  //~ separated for proper grid alignment
  if(type === 'troop') {
    entityData = entityData as troopDataSubType;
    dataToShow["Preferred Target"] = [entityData["preferredTarget"], statIcons['target']]
    dataToShow["Attack Type"] = [entityData.attackType, statIcons['target']]
    dataToShow["Targets"] = [entityData.targets, statIcons['target']]
  } else if(type === 'spell') {
    entityData = entityData as spellDataSubType;
    if('spellDuration' in entityData)   // the fixed one
      dataToShow['Spell Lifespan'] = [entityData['spellDuration']+'s', statIcons['time']]
    if('clonedLifespan' in entityData)
      dataToShow[`Clone Lifespan`] = [entityData['clonedLifespan'] + "s", statIcons['time']]
    
    if(!('Radius ' in dataToShow))    // earthquake fix-around
      dataToShow['Radius'] = [entityData['radius'], statIcons['radius']]
    dataToShow['Targets'] = [entityData['targets'], statIcons['target']]
  }
  return dataToShow;
}

function convertToMins(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60)
  return minutes === 0 ? `${seconds}s` : seconds !== 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}