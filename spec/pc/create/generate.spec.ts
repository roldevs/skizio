// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { BonusTwo } from '../../../src/lib/ve-pc/src/bonus/two';
import { Class, IClassFactory } from '../../../src/lib/ve-pc/src/class';
import { Dice } from '../../../src/lib/ve-pc/src/dice';
import { Gear, IGearFactory } from '../../../src/lib/ve-pc/src/gear';
import { Items } from '../../../src/lib/ve-pc/src/items';
import { ILoaderFactory, Loader } from '../../../src/lib/ve-pc/src/loader';
import { IPCCreateConfig, PCCreate } from '../../../src/lib/ve-pc/src/pc/create';
import { IRaceFactory, Race } from '../../../src/lib/ve-pc/src/race';
import { TBonus } from '../../../src/lib/ve-pc/typings/bonus';
import { IClassDef } from '../../../src/lib/ve-pc/typings/class';
import { IFileFactory } from '../../../src/lib/ve-pc/typings/file';
import { IPC } from '../../../src/lib/ve-pc/typings/pc';
import { IRaceDef } from '../../../src/lib/ve-pc/typings/race';

describe('PCCreate#get', () => {
  const raceName: string = 'elf';
  const className: string = 'fighter';
  const movement: number = 12;
  const raceDef: IRaceDef = {
    name: raceName,
    movement,
    priorities: {
      attributes: [{
        key: 'strength',
        value: 1,
      }, {
        key: 'dexerety',
        value: 2,
      }, {
        key: 'constitution',
        value: 3,
      }],
      habilities: [{
        key: 'alertness',
        value: 4,
      }, {
        key: 'comunication',
        value: 3,
      }, {
        key: 'manipulation',
        value: 5,
      }, {
        key: 'lore',
        value: 6,
      }, {
        key: 'stealth',
        value: 1,
      }, {
        key: 'survival',
        value: 2,
      }],
    },
    talents: [
      'talent1',
      'talent2',
    ],
  };
  const classDef: IClassDef = {
    name: className,
    hit_dice: 8,
    priorities: {
      attributes: [{
        key: 'strength',
        value: 2,
      }, {
        key: 'dexerety',
        value: 5,
      }, {
        key: 'inteligence',
        value: 3,
      }, {
        key: 'constitution',
        value: 1,
      }],
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
    talents: [
      'talent3',
      'talent2',
    ],
    progress: [{
      atk: 1,
      mp: 2,
      ins: 3,
    }],
  };
  const backgrounds: string[] = [
    'back1',
    'back2',
  ];
  const gearTestFile: () => IFileFactory = () => {
    const listDir: (path: string) => string[] = () => [];
    const loadYAML: (path: string) => any = () => [];

    return {
      listDir,
      loadYAML,
    };
  };

  const loader: ILoaderFactory = Loader({
    root: './',
    file: gearTestFile(),
    locale: 'es',
    system: 've.jdr',
  });
  const gear: IGearFactory = Gear({ loader });
  const startHabilityPoints = 4;
  const race: IRaceFactory = Race(raceDef);
  const cl: IClassFactory = Class(classDef);
  const bonus: TBonus = BonusTwo;
  const config: IPCCreateConfig = {
    startHabilityPoints,
    race,
    class: cl,
    dice: Dice,
    backgrounds,
    gear,
    bonus,
  };
  const attributes: string[] = R.map(R.prop('key'), Items({
    itemsA: race.getAttributes(),
    itemsB: cl.getAttributes(),
  }).combinedSorted);
  const result: IPC = PCCreate(config).generate();

  describe('attributes', () => {
    it('generate new PC', () => {
      R.forEach((attribute: string) => {
        expect(result.attributes[attribute]).to.be.a('number');
      }, attributes);
    });
  });

  describe('habilities', () => {
    it('generate new PC', () => {
      expect(result.habilities).to.eql({
        alertness: 1,
        comunication: 1,
        manipulation: 1,
        lore: 0,
        stealth: 0,
        survival: 1,
      });
    });
  });

  describe('talents', () => {
    it('combine race and class talents', () => {
      expect(result.talents).to.eql([
        'talent1',
        'talent2',
        'talent3',
      ]);
    });
  });

  describe('progress', () => {
    it('get atk, mp and ins from level 1', () => {
      expect(result.atk).to.eql(1);
      expect(result.mp).to.eql(2);
      expect(result.ins).to.eql(3);
    });
  });

  describe('level', () => {
    it('level starts at 1', () => {
      expect(result.level).to.eql(1);
    });
  });

  describe('movement', () => {
    it('get race movement', () => {
      expect(result.movement).to.eql(movement);
    });
  });

  describe('backgrounds', () => {
    it('pick one randomly', () => {
      expect(result.background).to.be.oneOf(backgrounds);
    });
  });
});
