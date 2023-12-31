import { playBoostAudio, playButtonAudio, playCryAudio, playNonSpellAudio, playSpellAudio } from "./svelte-stores";
import type { troopDataType, spellDataType, siegeDataType } from "./typeDeclarations";

export const updateClickAudio = () => {
  playButtonAudio.update(state => {
    state++;
    return state;
  });
}

export const updateNonSpellAudio = () => {
  playNonSpellAudio.update(state => {
    state++;
    return state;
  });
}

export const updateSpellAudio = () => {
  playSpellAudio.update(state => {
    state++;
    return state;
  });
}

export const updateBoostAudio = () => {
  playBoostAudio.update(state => {
    state++;
    return state;
  });
}

export const updateCryAudio = (crySource: string) => {
  playCryAudio.update(state => {
    state.count++;
    state.src = crySource;
    return state;
  })
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