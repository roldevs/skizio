import R from 'ramda';
import { IClassDef, IClassProgressItem } from '../typings/class';
import { IItem } from '../typings/common';

interface IClassFactory {
  getName: () => string;
  getAttributes: () => IItem[];
  getHabilites: () => IItem[];
  getTalents: () => string[];
  getProgress: () => IClassProgressItem[];
  getHitDice: () => number;
}

type TClass = (definition: IClassDef) => IClassFactory;

const Class: TClass = (definition) => {
  const getName: () => string = () => definition.name;
  const getAttributes: () => IItem[] = () => R.view(R.lensPath(['priorities', 'attributes']), definition);
  const getHabilites: () => IItem[] = () => R.view(R.lensPath(['priorities', 'habilities']), definition);
  const getTalents: () => string[] = () => R.prop('talents', definition);
  const getProgress: () => IClassProgressItem[] = () => R.prop('progress', definition);
  const getHitDice: () => number = () => R.prop('hit_dice', definition);

  return {
    getName,
    getAttributes,
    getHabilites,
    getTalents,
    getProgress,
    getHitDice,
  };
};

export {
  IClassFactory,
  TClass,
  Class,
};
