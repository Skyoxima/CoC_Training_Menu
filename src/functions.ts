import { playButtonAudio } from "./svelte-stores";
import type { troopDataType, spellDataType } from "../typeDeclarations";

export const updateClickAudio = () => {
  playButtonAudio.update(state => {
    state++;
    return state;
  });
}

//>> Type Guards, the functions which narrow down the type at block level.
export function isTroopData(data: troopDataType | spellDataType): data is troopDataType {
  return "barbarian" in data;
}

export function isSpellData(data: troopDataType | spellDataType): data is spellDataType {
  return "lightning" in data;
}