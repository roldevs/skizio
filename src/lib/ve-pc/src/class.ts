import R from 'ramda';
import { IClassDef, IClassProgressItem } from '../typings/class';
import { IItem } from '../typings/common';
import { ITalentDef } from '../typings/talent';
import { Talent } from './talent';

interface IClassFactory {
  getName: () => string;
  getLocalized: () => string;
  getAttributes: () => IItem[];
  getHabilites: () => IItem[];
  getTalents: (level: number) => string[];
  getProgress: () => IClassProgressItem[];
  getHitDice: () => number;
}

type TClass = (definition: IClassDef) => IClassFactory;

const Class: TClass = (definition) => {
  const talents: ITalentDef = R.prop('talents', definition);
  const getName: () => string = () => definition.name;
  const getLocalized: () => string = () => definition.localize;
  const getTalents: (level: number) => string[] = Talent({ talents }).get;
  const getAttributes: () => IItem[] = () => R.view(R.lensPath(['priorities', 'attributes']), definition);
  const getHabilites: () => IItem[] = () => R.view(R.lensPath(['priorities', 'habilities']), definition);
  const getProgress: () => IClassProgressItem[] = () => R.prop('progress', definition);
  const getHitDice: () => number = () => R.prop('hit_dice', definition);

  return {
    getName,
    getLocalized,
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
