interface IAttributes {
  strength: number;
  dexerety: number;
  constitution: number;
  inteligence: number;
  wisdom: number;
  charisma: number;
}

interface IHabilities {
  alertness: number;
  comunication: number;
  manipulation: number;
  lore: number;
  stealth: number;
  survival: number;
}

interface IItem {
  key: string;
  value: number;
}

interface IHash {
  [key: string]: number;
}

export {
  IAttributes,
  IHabilities,
  IItem,
  IHash,
};
