// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { IRandomItem, Random } from '../../src/lib/ve-pc/src/random';

describe('Random#probabilityList', () => {
  describe('with no elements', () => {
    it('returns empty array', () => {
      expect(Random().probabilityList([])).to.eql([]);
    });
  });
  describe('with several', () => {
    it('returns the lists with repeated elements by priority', () => {
      const list: Array<IRandomItem<string>> = [{
        item: 'a',
        priority: 1,
      }, {
        item: 'b',
        priority: 2,
      }, {
        item: 'c',
        priority: 3,
      }];
      expect(Random().probabilityList(list)).to.eql(['a', 'a', 'a', 'b', 'b', 'c']);
    });
  });
});
