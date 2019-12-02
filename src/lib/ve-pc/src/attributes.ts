import R from 'ramda';
import { TBonus } from '../typings/bonus';
import { IHash } from '../typings/common';
import { IClassFactory } from './class';
import { TDice } from './dice';
import { Items } from './items';

interface IAttributesConfig {
  class: IClassFactory;
  dice: TDice;
  bonus: TBonus;
}

interface IAttributesFactory {
  initial: () => IHash;
  isValid: (attributes: IHash) => boolean;
  getBonus: (attributes: IHash) => IHash;
}

const Attributes: (config: IAttributesConfig) => IAttributesFactory =
  (config) => {
    const forEachIndexed = R.addIndex<string>(R.forEach);

    const roll3d6: (reroll: number) => number[] = (reroll) => {
      const diff: (a: number, b: number ) => number = (a, b) => b - a;
      const values: number[][] = R.times(config.dice(6, 3).roll, reroll);
      return R.compose(R.sort(diff), R.map(R.sum))(values);
    };

    const attributeKeys: () => string[] =
      () => R.map(R.prop('key'), Items({
          items: config.class.getAttributes(),
        }).sorted);

    const getAttributes: () => IHash =
      () => {
        const keys: string[] = attributeKeys();
        const dices: number[] = roll3d6(keys.length);
        const attributes: IHash = {};
        const setAtribute: (item: string, idx: number) => void =
          (item, idx) => attributes[item] = dices[idx];
        forEachIndexed(setAtribute, keys);
        return attributes;
      };

    const initial: () => IHash =
      () => {
        let attrs: IHash;
        do { attrs = getAttributes(); } while (!isValid(attrs));
        return attrs;
      };

    const getBonus: (attributes: IHash) => IHash =
      (attributes) => config.bonus({ attributes }).get();

    const areAllAttributesValid: (minValue: number) => (attrs: IHash) => boolean =
      (minValue) => R.compose(R.any(R.lte(minValue)), R.values);

    const areAllBonusValid: (minValue: number) => (attrs: IHash) => boolean =
      (minValue) => R.compose(R.lte(minValue), R.sum, R.values, getBonus);

    const isValid: (attributes: IHash) => boolean = R.allPass([
      areAllAttributesValid(15),
      areAllBonusValid(0),
    ]);

    return {
      initial,
      getBonus,
      isValid,
    };
  };

export {
  IAttributesConfig,
  IAttributesFactory,
  Attributes,
};
