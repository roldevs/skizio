import { IItem } from "./common";
import { ITalentDef } from "./talent";

interface IRaceDef {
  name: string;
  localize: string;
  movement: number;
  talents: ITalentDef;
}

export {
  IRaceDef,
};
