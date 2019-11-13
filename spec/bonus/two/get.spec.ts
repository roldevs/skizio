// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { BonusTwo } from '../../../src/lib/ve-pc/src/bonus/two';
import { IBonusFactory } from '../../../src/lib/ve-pc/typings/bonus';
import { IHash } from '../../../src/lib/ve-pc/typings/common';

describe('BonusTwo#get', () => {
  const attributes: IHash = {
    attr1: 1,
    attr2: 2,
    attr3: 3,
    attr4: 4,
    attr5: 5,
    attr6: 6,
    attr7: 7,
    attr8: 8,
    attr9: 9,
    attr10: 10,
    attr11: 11,
    attr12: 12,
    attr13: 13,
    attr14: 14,
    attr15: 15,
    attr16: 16,
    attr17: 17,
    attr18: 18,
    attr19: 19,
  };
  const bonus: IBonusFactory = BonusTwo({ attributes });
  it('calculates bonus values', () => {
    expect(bonus.get()).to.eql({
      attr1: -2,
      attr2: -2,
      attr3: -2,
      attr4: -1,
      attr5: -1,
      attr6: -1,
      attr7: 0,
      attr8: 0,
      attr9: 0,
      attr10: 0,
      attr11: 0,
      attr12: 0,
      attr13: 0,
      attr14: 0,
      attr15: 1,
      attr16: 1,
      attr17: 1,
      attr18: 2,
      attr19: 2,
    });
  });
});
