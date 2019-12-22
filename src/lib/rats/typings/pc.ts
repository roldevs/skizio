import { IArmItem } from './arm';
import { IProfessionItem } from './profession';
import { IReputationItem } from './reputation';

enum EGender {
  male = 'male',
  female = 'female',
}

interface IRatsPC {
  brawn: number;
  dexterity: number;
  violence: number;
  wits: number;
  willpower: number;
  hp: number;
  sp: number;
  profession: IProfessionItem;
  reputation: IReputationItem;
  gear: string[];
  arms: IArmItem;
  name: string;
  gender: EGender;
  imageUrl: string;
}

export {
  EGender,
  IRatsPC,
};
