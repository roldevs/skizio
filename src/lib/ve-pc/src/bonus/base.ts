import R from 'ramda';
import { TBonus } from '../../typings/bonus';
import { IHash, IItem } from '../../typings/common';

interface IBonusRange {
  bonus: number;
  values: number[];
}

const BonusBase: (values: IBonusRange[] ) => TBonus = (values) => (config) => {
  const isValueInBonus: (value: number) => (item: IBonusRange) => boolean =
    (value) => (item) => !!R.includes(value, item.values);

  const modifier: (value: number) => number =
    (value) => {
      const bonus: IBonusRange = R.find(isValueInBonus(value), values)!;
      return bonus.bonus;
    };

  const applyModifier: (acc: IHash, key: string) => IHash =
    (acc, key) => R.set(R.lensProp(key), modifier(config.attributes[key]), acc);

  const get: () => IHash =
    () => R.reduce(applyModifier, {}, Object.keys(config.attributes));

  return {
    get,
  };
};

export {
  IBonusRange,
  BonusBase,
};
