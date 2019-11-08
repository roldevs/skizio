import R from 'ramda';
import {
  IItem,
} from '../typings/common';
import { IRaceDef } from '../typings/race';

interface IRaceFactory {
  getName: () => string;
  getAttributes: () => IItem[];
  getHabilites: () => IItem[];
  getTalents: () => string[];
  getMovement: () => number;
}

type TRace = (definition: IRaceDef) => IRaceFactory;

const Race: TRace = (definition) => {
  const getName: () => string = () => definition.name;
  const getAttributes: () => IItem[] = () => R.view(R.lensPath(['priorities', 'attributes']), definition);
  const getHabilites: () => IItem[] = () => R.view(R.lensPath(['priorities', 'habilities']), definition);
  const getTalents: () => string[] = () => R.prop('talents', definition);
  const getMovement: () => number = () => R.prop('movement', definition);

  return {
    getName,
    getAttributes,
    getHabilites,
    getTalents,
    getMovement,
  };
};

export {
  IRaceFactory,
  TRace,
  Race,
};
