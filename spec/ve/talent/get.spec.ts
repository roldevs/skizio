// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { ITalentFactory, Talent } from '../../../src/lib/ve-pc/src/talent';
import { ITalentDef } from '../../../src/lib/ve-pc/typings/talent';

describe('Talent#get', () => {
  const talents: ITalentDef = {
    1: ['talent11', 'talent12'],
    2: ['talent21', 'talent22'],
    4: ['talent41', 'talent42'],
  };

  const talent: ITalentFactory = Talent({ talents });

  describe('for level 1', () => {
    it('returns level 1 talents', () => {
      expect(talent.get(1)).to.have.members(['talent11', 'talent12']);
    });
  });
  describe('for level 2', () => {
    it('returns level 1 and level 2 talents', () => {
      expect(talent.get(2)).to.have.members([
        'talent11', 'talent12',
        'talent21', 'talent22',
      ]);
    });
  });
  describe('for leevl 4', () => {
    it('returns level 1, level 2 and level 4 talents', () => {
      expect(talent.get(4)).to.have.members([
        'talent11', 'talent12',
        'talent21', 'talent22',
        'talent41', 'talent42',
      ]);
    });
  });
});
