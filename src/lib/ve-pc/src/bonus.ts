import R from 'ramda';
import { IClassDef, IClassProgressItem } from '../typings/class';
import { IHash, IItem } from '../typings/common';

interface IBonusConfig {
  attributes: IHash;
}

interface IBonusFactory {
  get: () => IHash;
}

type TBonus = (config: IBonusConfig) => IBonusFactory;

const Bonus: TBonus = (config) => {
  const modifier: (value: number) => number =
    (value) => {
      if (value <= 3) {
        return -2;
      }
      if (value >= 4 && value <= 6) {
        return -1;
      }
      if (value >= 4 && value <= 6) {
        return -1;
      }
      if (value >= 7 && value <= 14) {
        return 0;
      }
      if (value >= 15 && value <= 17) {
        return 1;
      }
      return 2;
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
  IBonusConfig,
  IBonusFactory,
  TBonus,
  Bonus,
};
