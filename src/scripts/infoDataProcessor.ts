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
    // all types of damages and healings
    Object.entries(entityData).forEach(([key, value]) => {
      if(['Damage', 'DPS', 'Secondary', 'Aura'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.currLevel - 1] || (value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['damage']];
      } else if(['Healing'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.currLevel - 1] || (value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['heal1']];
      } else if(['HPS'].includes(key.split(' ')[0])) {
        dataToShow[`${key}`] = [(value as string[])[entityData.currLevel - 1] || (value as string[])[entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['heal2']];
      }
    })

    dataToShow['HP'] = [entityData["Hitpoints"][entityData.currLevel - 1] || entityData["Hitpoints"][entityData.Level.indexOf(`${entityData.currLevel}`)], statIcons['hp']];
    dataToShow['Movement Speed'] = [entityData["movementSpeed"], statIcons['speed']];
    dataToShow["Training Time"] = [convertToMins(entityData.makeDuration), statIcons['time']]
  }

  else if(type === 'spell') {
    Object.entries(entityData).forEach(([key, value]) => {
      
    })
  }

  // separated for proper grid alignment
  dataToShow["Housing Space"] = [entityData.housingSpace, statIcons['housing']];
  if(type === 'troop') {
    entityData = entityData as troopDataSubType;
    dataToShow["Preferred Target"] = [entityData["preferredTarget"], statIcons['target']]
    dataToShow["Attack Type"] = [entityData.attackType, statIcons['target']]
    dataToShow["Targets"] = [entityData.targets, statIcons['target']]
  }
  console.log(dataToShow)
  return dataToShow;
}

function convertToMins(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60)
  return minutes === 0 ? `${seconds}s` : seconds !== 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}