import type { entityInfoToShowType, infoTabDataType, siegeDataSubType, spellDataSubType, troopDataSubType } from "./typeDeclarations";

const troopTypes = ['elixir-troop', 'dark-elixir-troop', 'super-elixir-troop', 'super-dark-elixir-troop'];
const superTroopTypes = troopTypes.slice(2)
const spellTypes = ['elixir-spell', 'dark-elixir-spell']
const noDPSTroops = ['wallbreaker', 'healer', 's-wallbreaker']

export function giveProperInfoData(storeData: entityInfoToShowType) {
  let toReturn: infoTabDataType = {'generalType': 'troop', 'portraitStyle': 'elixir'};
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

  if(troopTypes.includes(storeData.entityType)) {
    toReturn['generalType'] = 'troop';
    
    toReturn['entityName'] = storeData.entityID;
    const scopedData = storeData.entityData as troopDataSubType;
    toReturn['portraitSrc'] = scopedData.modelSource;
    toReturn['hp'] = scopedData.Hitpoints[scopedData.maxLevel - 1];
    toReturn['trainingTime'] = scopedData.makeDuration;
    toReturn['movementSpeed'] = scopedData.movementSpeed;

    if(!noDPSTroops.includes(storeData.entityID) && 'Damage per Attack' in scopedData && 'Damage per Second' in scopedData) {
      toReturn['dph'] = (scopedData["Damage per Attack"] as string[])[scopedData.maxLevel - 1]
      toReturn['dps'] = (scopedData["Damage per Second"] as string[])[scopedData.maxLevel - 1]
    }
  }

  // then in the component I'll have to use 'in' to get the properties properly
  return toReturn;
}