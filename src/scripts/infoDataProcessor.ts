import type { entityInfoToShowType, infoTabDataType, siegeDataSubType, spellDataSubType, troopDataSubType } from "./typeDeclarations";

const troopTypes = ['elixir-troop', 'dark-elixir-troop', 'super-elixir-troop', 'super-dark-elixir-troop'];

export function typeLvlSrcStyle(storeData: entityInfoToShowType) {
  let toReturn: infoTabDataType = {'generalType': 'troop', 'level': 0, 'portraitStyle': 'elixir', 'portraitSrc': ''};
  toReturn['level'] = (storeData.entityData as troopDataSubType | spellDataSubType | siegeDataSubType).currLevel;

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
  
  toReturn['portraitSrc'] = (storeData.entityData as troopDataSubType | spellDataSubType | siegeDataSubType).modelSource;
  return toReturn;
}