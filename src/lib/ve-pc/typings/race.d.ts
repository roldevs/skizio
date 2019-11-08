import { IItem } from "./common";

interface IRaceDef {
  name: string;
  movement: number;
  priorities:{
    attributes: IItem[];
    habilities: IItem[];
  };
  talents: string[];
}

export {
  IRaceDef,
};
