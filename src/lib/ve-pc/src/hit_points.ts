import R from 'ramda';
import { IClassProgressItem } from '../typings/class';
import { IClassFactory } from './class';
import { Dice, IDiceFactory, TDice } from './dice';
import { IRaceFactory } from './race';

interface IHitPointsConfig {
  class: IClassFactory;
  dice: TDice;
}

interface IHitPointsFactory {
  incrementLevel: (currentLevel: number, constitution: number, previous?: number) => number;
  get: (level: number, constitution: number, previous?: number) => number;
}

const HitPoints: (config: IHitPointsConfig) => IHitPointsFactory =
  (config) => {
    const dice: IDiceFactory = config.dice(config.class.getHitDice(), 1);
    const rollHitDice: () => number = () => R.sum(dice.roll());

    const incrementLevel: (currentLevel: number, constitution: number, previous?: number) => number =
      (currentLevel, constitution, previous) => {
        previous = previous || 0;

        if (currentLevel === 0) {
          return previous + config.class.getHitDice() + constitution;
        }

        if (currentLevel < 10) {
          return previous + rollHitDice() + constitution;
        }
        return previous + constitution;
      };

    const get: (level: number, constitution: number) => number =
      (level, constitution) => {
        return R.reduce((acc: number, currentLevel: number ) => {
          return incrementLevel(currentLevel, constitution, acc);
        }, 0, R.times(R.identity, level));
      };

    return {
      incrementLevel,
      get,
    };
  };

export {
  IHitPointsConfig,
  IHitPointsFactory,
  HitPoints,
};
