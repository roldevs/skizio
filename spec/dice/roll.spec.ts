// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Dice } from '../../src/lib/ve-pc/src/dice';

describe('Dice#roll', () => {
  describe('6 sides', () => {
    describe('3 dices', () => {
      it('returns three values with dice values', () => {
        const result: number[] = Dice(6, 3).roll();
        const expectSide: (side: number) => void = (side) => {
          expect(side).to.be.oneOf([1, 2, 3, 4, 5, 6]);
        };

        expect(result).to.have.lengthOf(3);
        R.forEach(expectSide , result);
      });
    });
  });
});
