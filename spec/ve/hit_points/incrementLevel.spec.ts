// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Class } from '../../../src/lib/ve-pc/src/class';
import { TDice } from '../../../src/lib/ve-pc/src/dice';
import { HitPoints, IHitPointsConfig } from '../../../src/lib/ve-pc/src/hit_points';
import { IClassDef } from '../../../src/lib/ve-pc/typings/class';
import { TestDice } from '../dice/test_dice';

describe('HitPoints#incrementLevel', () => {
  const name: string = 'fighter';
  const diceResult: number = 6;
  const hitDice: number = 8;
  const testDice: TDice = TestDice(diceResult);
  const classDef: IClassDef = {
    name,
    localize: name,
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
  const previous: number = 8;

  describe('level 0', () => {
    it('previous + hitDice + constitution;', () => {
      const result: number = HitPoints(config).incrementLevel(0, constitution, previous);
      expect(result).to.be.eql(previous + hitDice + constitution);
    });
  });

  R.forEach((level: number) => {
    describe(`level ${level}`, () => {
      it('previous + constitution + roll', () => {
        const result: number = HitPoints(config).incrementLevel(level, constitution, previous);
        expect(result).to.be.eql(previous + diceResult + constitution);
      });
    });
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  R.forEach((level: number) => {
    describe(`level ${level}`, () => {
      it('previous + constitution', () => {
        const result: number = HitPoints(config).incrementLevel(level, constitution, previous);
        expect(result).to.be.eql(previous + constitution);
      });
    });
  }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
});
