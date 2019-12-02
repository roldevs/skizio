import R from 'ramda';
import { IRaceDef } from '../typings/race';
import { ITalentDef } from '../typings/talent';
import { Talent } from './talent';

interface IRaceFactory {
  getName: () => string;
  getLocalized: () => string;
  getTalents: (level: number) => string[];
  getMovement: () => number;
}

type TRace = (definition: IRaceDef) => IRaceFactory;

const Race: TRace = (definition) => {
  const talents: ITalentDef = R.prop('talents', definition);
  const getName: () => string = () => definition.name;
  const getLocalized: () => string = () => definition.localize;
  const getTalents: (level: number) => string[] = Talent({ talents }).get;
  const getMovement: () => number = () => R.prop('movement', definition);

  return {
    getName,
    getLocalized,
    getTalents,
    getMovement,
  };
};

export {
  IRaceFactory,
  TRace,
  Race,
};
