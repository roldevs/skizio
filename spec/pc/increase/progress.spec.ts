// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { Class, IClassFactory } from '../../../src/lib/ve-pc/src/class';
import { Dice } from '../../../src/lib/ve-pc/src/dice';
import { Habilities, IHabilitiesFactory } from '../../../src/lib/ve-pc/src/habilities';
import { HitPoints, IHitPointsFactory } from '../../../src/lib/ve-pc/src/hit_points';
import { IPCIncreaseConfig, PCIncrease } from '../../../src/lib/ve-pc/src/pc/increase';
import { IProgressFactory, Progress } from '../../../src/lib/ve-pc/src/progress';
import { IRaceFactory, Race } from '../../../src/lib/ve-pc/src/race';
import { IClassDef, IClassProgressItem } from '../../../src/lib/ve-pc/typings/class';
import { IPC } from '../../../src/lib/ve-pc/typings/pc';
import { IRaceDef } from '../../../src/lib/ve-pc/typings/race';

describe('Increase#increase', () => {
  const raceName: string = 'elf';
  const className: string = 'fighter';
  const movement: number = 12;
  const raceDef: IRaceDef = {
    name: raceName,
    localize: raceName,
    movement,
    talents: {},
  };
  const classDef: IClassDef = {
    name: className,
    localize: className,
    hit_dice: 8,
    priorities: {
      attributes: [{
        key: 'strength',
        value: 2,
      }, {
        key: 'dexerety',
        value: 5,
      }],
      habilities: [{
        key: 'alertness',
        value: 2,
      }, {
        key: 'comunication',
        value: 4,
      }],
    },
    talents: {},
    progress: [{
      atk: 1,
      mp: 2,
      ins: 3,
    }, {
      atk: 3,
      mp: 4,
      ins: 5,
    }],
  };
  const backgrounds: string[] = [
    'back1',
    'back2',
  ];
  const race: IRaceFactory = Race(raceDef);
  const cl: IClassFactory = Class(classDef);
  const habilities: IHabilitiesFactory = Habilities({
    class: cl,
  });
  const progress: IProgressFactory = Progress({ class: cl });
  const hitPoints: IHitPointsFactory = HitPoints({ class: cl, dice: Dice });

  const config: IPCIncreaseConfig = {
    race,
    class: cl,
    habilities,
    hitPoints,
    progress,
  };

  const pc: IPC = {
    race: '',
    class: '',
    level: 1,
    movement: 0,
    attributes: {},
    attr_bonus: {
      inteligence: 2,
    },
    habilities: {},
    talents: [],
    atk: 1,
    mp: 2,
    ins: 3,
    pv: 0,
    def: '',
    background: '',
    money: 0,
    arms: [],
    armors: [],
  };
  const result: IPC = PCIncrease(config).increase(pc);

  describe('progress', () => {
    it('increase atq/ins/pod values', () => {
      expect(result.atk).to.eql(3);
      expect(result.mp).to.eql(6); // 4+inteligence bonus
      expect(result.ins).to.eql(5);
    });
  });
});
