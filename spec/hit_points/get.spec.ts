// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Class, IClassFactory } from '../../src/lib/ve-pc/src/class';
import { TDice } from '../../src/lib/ve-pc/src/dice';
import { HitPoints, IHitPointsConfig, IHitPointsFactory } from '../../src/lib/ve-pc/src/hit_points';
import { Items } from '../../src/lib/ve-pc/src/items';
import { IRaceFactory, Race } from '../../src/lib/ve-pc/src/race';
import { IClassDef } from '../../src/lib/ve-pc/typings/class';
import { IItem } from '../../src/lib/ve-pc/typings/common';
import { IRaceDef } from '../../src/lib/ve-pc/typings/race';
import { TestDice } from '../dice/test_dice';

describe('HitPoints#get', () => {
  const name: string = 'fighter';
  const diceResult: number = 6;
  const testDice: TDice = TestDice(diceResult);
  const hitDice: number = 8;
  const classDef: IClassDef = {
    name,
    hit_dice: hitDice,
    priorities: {
      attributes: [],
      habilities: [],
    },
    talents: [],
    progress: [],
  };
  const config: IHitPointsConfig = {
    class: Class(classDef),
    dice: testDice,
  };
  const constitution: number = 2;
  const hitPoints: IHitPointsFactory = HitPoints(config);

  describe('level 1', () => {
    const level = 1;
    it('constitution + hit dice', () => {
      const result: number = HitPoints(config).get(level, constitution);
      const expected: number = hitDice + constitution;
      expect(result).to.be.eql(expected);
    });
  });

  R.forEach((level: number) => {
    describe(`level ${level}`, () => {
      it(`constitution + hit dice + (${level} - 1) * (constitution + roll)`, () => {
        const result: number = hitPoints.get(level, constitution);
        const expected: number = constitution + hitDice + (level - 1) * (diceResult + constitution);
        expect(result).to.be.eql(expected);
      });
    });
  }, [2, 3, 4, 5, 6, 7, 8, 9, 10]);

  R.forEach((level: number) => {
    describe(`level ${level}`, () => {
      it(`constitution + hit dice + 10 * (constitution + roll) + ${level - 10} * constitution`, () => {
        const result: number = hitPoints.get(level, constitution);
        const base: number = constitution + hitDice;
        const expected: number = base + 9 * (diceResult + constitution) + (level - 10) * constitution;

        // tslint:disable-next-line:no-console
        console.log(level, expected);

        expect(result).to.be.eql(expected);
      });
    });
  }, [11]);
});
