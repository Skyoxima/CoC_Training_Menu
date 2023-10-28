export interface queueStateType {
  queued: { [key: string]: number };
  currentCapacity: number;
  timeLeft: number;
}

export type queueManagerType = {
  entity: string;
  entityTimeLeft: number;
  entityMakeDuration: number;
  percentDone: string;
}

export type intervalIDType = {
  troop: number;
  spell: number;
  siege: number;
}

export type madeEntitiesStateType = {
  troops: {[key: string]: number};
  spells: {[key: string]: number};
  sieges: {[key: string]: number};
}

export type entityInfoToShowType = {
  entityID: string;
  entityData: troopDataSubType | spellDataSubType | siegeDataSubType | {};
  entityType: string
}

export type ratesType = {
  troop: number;
  spell: number;
  siege: number;
};

export type infoTabDataType = {
  generalType: "troop" | "spell" | "siege";
  level: number;
  portraitStyle: string;
  portraitSrc: string;
  [key: string]: any
}

// first section are the compulsory entries for every troop
export type troopDataType = {
  [key: string]: {
    iconSource: string;
    modelSource: string;
    crySource: string;
    type: string;
    maxLevel: number;
    currLevel: number;
    housingSpace: number;
    makeDuration: number;
    movementSpeed: number;
    preferredTarget: string;
    attackType: string;
    targets: string;
    Level: string[];
    Hitpoints: string[];
    [key: string]: string[] | number | string;    // rest of the varying stats
  };
}

export type troopDataSubType = troopDataType[keyof troopDataType];

export type spellDataType = {
  [key: string]: {
    radius?: string; // optional as lighning and eq have diff radius
    spellDuration?: number; // some spells don't have it
    targets?: string;
    makeDuration: number;
    maxLevel: number;
    currLevel: number;
    iconSource: string;
    modelSource: string;
    crySource: string;
    housingSpace: number;
    type: string;
    Level: string[];
    "Research Cost": string[];
    "Research Time": string[];
    "Laboratory Level Required": string[];
  } & (
    | {
        // lightning
        stunTime: string;
        Damage: string[];
      }
    | ({
        // heal and rage
        noofpulses: number;
        timeBtwnPulses: string;
      } & (
        | {
            // heal only
            "Total Healing": string[];
            "Healing per Pulse": string[];
            "Total Healing on Heroes": string[];
          }
        | {
            // rage only
            boostTime: number; // in seconds
            "Damage Increase": string[];
            "Speed Increase": string[];
          }
      ))
    | {
        // jump
        boostTime: number;
        "Spell Duration": string[];
      }
    | {
        // freeze
        "Freeze Time": string[];
      }
    | {
        // clone
        spellDuration: number;
        clonedLifespan: number;
        "Cloned Capacity": string[];
      }
    | {
        // invisibility
        Duration: string[];
      }
    | {
        // recall
        "Recalled Capacity": string[];
      }
    | {
        // poison
        "Max DPS": string[];
        "Speed Decrease": string[];
        "Attack Rate Decrease": string[];
      }
    | {
        // earthquake
        favTarget: string;
        Damage: string[];
        Radii: string[];
      }
    | {
        // haste
        "Speed Increase": string[];
        "Spell Duration": string[];
      }
    | {
        // skeleton
        "Skeletons spawned": string[];
      }
    | {
        // bat
        "Bats spawned": string[];
      }
  );
};

export type spellDataSubType = spellDataType[keyof spellDataType];

export type siegeDataType = {
  [key: string]: {
    type: string;
    iconSource: string;
    modelSource: string;
    crySource: string;
    housingSpace: number;
    maxLevel: number;
    currLevel: number;
    makeDuration: number;
    movementSpeed: number;
    Level: string[];
    Hitpoints: string[];
    "Research Cost": string[];
    "Research Time": string[];
    "Laboratory Level Required": string[];
  } & (
    | ({
        // common to everyone except siege-barracks
        preferredTarget: string;
        attackType: string;
        attackSpeed: number;
        "Damage per Second": string[];
      } & (
        | { 
            "Damage per Attack": string[];
          }
          | {
            // slammer specific
            "Damage when Destroyed": string[];
            "Damage per Attack (Hitbox 1)": string[];
            "Damage per Attack (Hitbox 2)": string[];
          }
          | {
            // launcher specific
            "Damage per Attack": string[];
            "Point-Blank Damage": string[];
            Lifetimes: string[];
          }
          | {
            // flinger specific
            "Total Damage per Attack": string[];
            "Flame Maximum DPS": string[];
            Lifetimes: string[];
          }
      ))
    | {
        // siege-barracks specific
        Lifetime: number;
        "P.E.K.K.As Spawned": string[];
        "Wizards Spawned": string[];
      }
  );
};

export type siegeDataSubType = siegeDataType[keyof siegeDataType];





























// Junk
// export type troopDataType = {
//   [key: string]: {
//     iconSource: string;
//     modelSource: string;
//     type: string;
//     maxLevel: number;
//     currLevel: number;
//     housingSpace: number;
//     makeDuration: number;
//     movementSpeed: number;
//     Level: string[];
//     Hitpoints: string[];
//     "Research Cost"?: string[];
//     "Research Time"?: string[];
//     "Laboratory Level Required"?: string[]; // super troops wouldn't have lab info
//   } & (
//     | {
//         "Damage per Second": string[];
//         "Damage per Attack": string[];

//         "DPS on Resource Buildings"?: string[]; // goblins
//         "Damage Upon Death"?: string[]; // balloon, golem, lavahound
//         "Ability Damage per Second"?: string[]; // baby-dragon
//         "Yetimites spawned"?: string[];
//         "Aura Damage per Second"?: string[]; // electro-titan
//         "Aura Damage per Attack"?: string[];
//         "Golemites spawned Upon Death"?: string[]; // golem
//         "Maximum Skeletons Summoned"?: string[]; // witch
//         "Lava Pups Spawned (After Death)"?: string[];
//         "Freeze Time when Destroyed"?: string[];
//         "Ice Pups Spawned"?: string[];
//         "Freeze Time After Death On Offense"?: string[];
//         "Freeze Time After Death On Defense"?: string[];
//         "DPS on Heroes"?: string[];
//         "Speed Decrease"?: string[];
//         "Attack Rate Decrease"?: string[]; // x3 headhunter
//         "Aura HP Increase"?: string[];
//       }
//     | {
//         // Wall-breaker
//         Damage: string[];
//         "Damage when destroyed": string[];
//         "Damage to Walls": string[];
//         "Damage when destroyed to Walls": string[];
//       }
//     | {
//         // Super Wizard
//         "Damage per Second": string[];
//         "Damage per Attack(Primary Target)": string[];
//         "Secondary Chain Damage(per Target)": string[];
//       }
//     | {
//         // Healer
//         "Healing per Second": string[];
//         "Healing per Pulse": string[];
//         "HPS on Heroes": string[];
//       }
//     | {
//         // Inferno Dragon and Super Miner
//         "Damage per Second Stage 1": string[];
//         "Damage per Second Stage 2": string[];
//         "Damage per Second Stage 3": string[];
//       }
//     | {
//         // Electro Dragon
//         "Damage per Second(Primary Target)": string[];
//         "Damage per Hit(Primary Target)": string[];
//         "Damage when destroyed": string[];
//       }
//   );
// };
