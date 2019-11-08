// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { IRandomItem, Random } from '../../src/random';

describe('Random#pickFromList', () => {
  describe('with no elements', () => {
    it('returns null', () => {
      expect(Random().pickFromList([])).to.be.null;
    });
  });
  describe('with only one element', () => {
    it('returns the value of th element', () => {
      expect(Random().pickFromList([{item: 'Test', priority: 1}])).to.eql('Test');
    });
  });
  describe('with two elements', () => {
    it('returns the value of th element', () => {
      const list: Array<IRandomItem<string>> = [{
        item: 'Test1', priority: 1,
      }, {
        item: 'Test2', priority: 1,
      }];
      expect(Random().pickFromList(list)).to.be.oneOf(['Test1', 'Test2']);
    });
  });
});
