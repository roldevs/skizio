import R from 'ramda';
import { TDice } from '../../../src/lib/ve-pc/src/dice';

const TestDice: (fixed: number) => TDice =
  (fixed) => () => {
    const roll: () => number[] = () => [fixed];

    return {
      roll,
    };
  };

export {
  TestDice,
};
