// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { BonusThree } from '../../../../src/lib/ve-pc/src/bonus/three';
import { IBonusFactory } from '../../../../src/lib/ve-pc/typings/bonus';
import { IHash } from '../../../../src/lib/ve-pc/typings/common';

describe('BonusThree#get', () => {
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
  const bonus: IBonusFactory = BonusThree({ attributes });
  it('calculates bonus values', () => {
    expect(bonus.get()).to.eql({
      attr1: -3,
      attr2: -3,
      attr3: -3,
      attr4: -2,
      attr5: -2,
      attr6: -1,
      attr7: -1,
      attr8: -1,
      attr9: 0,
      attr10: 0,
      attr11: 0,
      attr12: 0,
      attr13: 1,
      attr14: 1,
      attr15: 1,
      attr16: 2,
      attr17: 2,
      attr18: 3,
      attr19: 3,
    });
  });
});
