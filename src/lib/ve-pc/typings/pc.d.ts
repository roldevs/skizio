import { IArm, IArmor } from "../src/gear";
import { IClassProgressItem } from "./class";

interface IPC {
  race: string;
  class: string;
  level: number;
  movement: number;
  attributes: {
    [key: string]: number;
  };
  attr_bonus: {
    [key: string]: number;
  };
  habilities: {
    [key: string]: number;
  };
  talents: string[];
  atk: number | null;
  mp: number | null;
  ins: number | null;
  def: string;
  pv: number;
  background: string;
  money: number;
  arms: IArm[],
  armors: IArmor[],
}

export {
  IPC,
};
