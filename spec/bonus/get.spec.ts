// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { Bonus, IBonusFactory } from '../../src/lib/ve-pc/src/bonus';
import { IHash } from '../../src/lib/ve-pc/typings/common';

describe('Bonus#get', () => {
  const attributes: IHash = {
    strength: 3,
    constitution: 5,
    inteligence: 8,
    wisdom: 16,
    dexerety: 18,
  };
  const bonus: IBonusFactory = Bonus({ attributes });
  it('calculates bonus values', () => {
    expect(bonus.get()).to.eql({
      strength: -2,
      constitution: -1,
      inteligence: 0,
      wisdom: +1,
      dexerety: +2,
    });
  });
});
