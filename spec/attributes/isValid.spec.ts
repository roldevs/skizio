// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Attributes, IAttributesFactory } from '../../src/lib/ve-pc/src/attributes';
import { BonusTwo } from '../../src/lib/ve-pc/src/bonus/two';
import { Class, IClassFactory } from '../../src/lib/ve-pc/src/class';
import { Dice } from '../../src/lib/ve-pc/src/dice';
import { TBonus } from '../../src/lib/ve-pc/typings/bonus';
import { IClassDef } from '../../src/lib/ve-pc/typings/class';
import { IHash } from '../../src/lib/ve-pc/typings/common';

describe('Attribiutes#isValid', () => {
  const className: string = 'fighter';
  const bonus: TBonus = BonusTwo;
  const classDef: IClassDef = {
    name: className,
    localize: className,
    hit_dice: 8,
    priorities: {
      attributes: [],
      habilities: [{
        key: 'alertness',
        value: 2,
      }, {
        key: 'comunication',
        value: 4,
      }, {
        key: 'manipulation',
        value: 1,
      }, {
        key: 'lore',
        value: 5,
      }, {
        key: 'stealth',
        value: 6,
      }, {
        key: 'survival',
        value: 3,
      }],
    },
    talents: {},
    progress: [],
  };
  const cls: IClassFactory = Class(classDef);
  const attributes: IAttributesFactory = Attributes({
    class: cls,
    bonus,
    dice: Dice,
  });

  describe('all attributes are less than 15', () => {
    it('should be no valid', () => {
      const attrs: IHash = {
        constitution: 10,
        strength: 14,
        dexerety: 13,
      };
      expect(attributes.isValid(attrs)).to.be.false;
    });
  });

  describe('at least one attribute is over 15', () => {
    it('should be valid', () => {
      const attrs: IHash = {
        constitution: 10,
        strength: 15,
        dexerety: 13,
      };
      expect(attributes.isValid(attrs)).to.be.true;
    });
  });

  describe('all bonus sums less than 0', () => {
    it('should be no valid', () => {
      const attrs: IHash = {
        constitution: 2, // -2
        strength: 10, // 0
        dexerety: 16, // 1
      };
      expect(attributes.isValid(attrs)).to.be.false;
    });
  });

  describe('all bonus sums more than 0', () => {
    it('should be no valid', () => {
      const attrs: IHash = {
        constitution: 5, // -1
        strength: 10, // 0
        dexerety: 16, // 1
      };
      expect(attributes.isValid(attrs)).to.be.true;
    });
  });
});
