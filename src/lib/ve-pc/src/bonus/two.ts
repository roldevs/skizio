import { TBonus } from '../../typings/bonus';
import { BonusBase } from './base';

const BonusTwo: TBonus = BonusBase([{
  bonus: -2,
  values: [1, 2, 3],
}, {
  bonus: -1,
  values: [4, 5, 6],
}, {
  bonus: 0,
  values: [7, 8, 9, 10, 11, 12, 13, 14],
}, {
  bonus: 1,
  values: [15, 16, 17],
}, {
  bonus: 2,
  values: [18, 19, 20],
}]);

export {
  BonusTwo,
};
