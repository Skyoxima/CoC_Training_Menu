import { playButtonAudio } from "./svelte-stores";
import type { troopDataType, spellDataType, siegeDataType } from "./typeDeclarations";

export const updateClickAudio = () => {
  playButtonAudio.update(state => {
    state++;
    return state;
  });
}

//>> Type Guards, the functions which narrow down the type at block level.
export function isTroopData(data: troopDataType | spellDataType | siegeDataType): data is troopDataType {
  return "barbarian" in data;
}

export function isSpellData(data: troopDataType | spellDataType | siegeDataType): data is spellDataType {
  return "lightning" in data;
}

export function isSiegeData(data: troopDataType | spellDataType | siegeDataType): data is siegeDataType {
  return "wall-wrecker" in data;
}