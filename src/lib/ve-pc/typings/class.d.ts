import { IItem } from "./common";

interface IClassProgressItem {
  atk: number;
  mp: number;
  ins: number;
}

interface IClassDef {
  name: string;
  hit_dice: number;
  priorities:{
    attributes: IItem[]
    habilities: IItem[]
  };
  talents: string[];
  progress: IClassProgressItem[];
}

export {
  IClassDef,
  IClassProgressItem,
};
