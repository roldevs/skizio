// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Class, IClassFactory } from '../../src/lib/ve-pc/src/class';
import { Items } from '../../src/lib/ve-pc/src/items';
import { IRaceFactory, Race } from '../../src/lib/ve-pc/src/race';
import { IItem } from '../../src/lib/ve-pc/typings/common';
import { IRaceDef } from '../../src/lib/ve-pc/typings/race';

describe('Items#sorted', () => {
  const classItems: IItem[] = [{
    key: 'strength',
    value: 2,
  }, {
    key: 'dexerety',
    value: 5,
  }, {
    key: 'constitution',
    value: 1,
  }];

  it('returns class attributes sorted', () => {
    const result: IItem[] = Items({items: classItems}).sorted;
    expect(result).to.be.eql([{
        key: 'constitution',
        value: 1,
      }, {
        key: 'strength',
        value: 2,
      }, {
        key: 'dexerety',
        value: 5,
    }]);
  });
});
