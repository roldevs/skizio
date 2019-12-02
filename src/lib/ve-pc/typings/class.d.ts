import { IItem } from "./common";
import { ITalentDef } from "./talent";

interface IClassProgressItem {
  atk: number;
  mp: number;
  ins: number;
}

interface IClassDef {
  name: string;
  localize: string;
  hit_dice: number;
  priorities:{
    attributes: IItem[]
    habilities: IItem[]
  };
  talents: ITalentDef;
  progress: IClassProgressItem[];
}

export {
  IClassDef,
  IClassProgressItem,
};
