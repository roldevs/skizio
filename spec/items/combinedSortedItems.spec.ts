// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Class, IClassFactory } from '../../src/lib/ve-pc/src/class';
import { Items } from '../../src/lib/ve-pc/src/items';
import { IRaceFactory, Race } from '../../src/lib/ve-pc/src/race';
import { IItem } from '../../src/lib/ve-pc/typings/common';
import { IRaceDef } from '../../src/lib/ve-pc/typings/race';

describe('Items#combinedSorted', () => {
  const raceItems: IItem[] = [{
    key: 'strength',
    value: 1,
  }, {
    key: 'dexerety',
    value: 2,
  }, {
    key: 'constitution',
    value: 3,
  }];
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

  it('returns class and race attribute combined and sorted', () => {
    const result: IItem[] = Items({itemsA: raceItems, itemsB: classItems}).combinedSorted;
    expect(result).to.be.eql([{
        key: 'strength',
        value: 3,
      }, {
        key: 'constitution',
        value: 4,
      }, {
        key: 'dexerety',
        value: 7,
    }]);
  });
});