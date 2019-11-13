import { TBonus } from '../../typings/bonus';
import { BonusBase } from './base';

const BonusThree: TBonus = BonusBase([{
  bonus: -3,
  values: [1, 2, 3],
}, {
  bonus: -2,
  values: [4, 5],
}, {
  bonus: -1,
  values: [6, 7, 8],
}, {
  bonus: -1,
  values: [6, 7, 8],
}, {
  bonus: 0,
  values: [9, 10, 11, 12],
}, {
  bonus: 1,
  values: [13, 14, 15],
}, {
  bonus: 2,
  values: [16, 17],
}, {
  bonus: 3,
  values: [18, 19, 20],
}]);

export {
  BonusThree,
};
