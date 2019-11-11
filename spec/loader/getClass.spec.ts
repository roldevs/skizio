// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { IClassFactory } from '../../src/lib/ve-pc/src/class';
import { FileTest, IFileTestDefinition, TFileTest } from '../../src/lib/ve-pc/src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader, TLoader } from '../../src/lib/ve-pc/src/loader';
import { IRaceFactory } from '../../src/lib/ve-pc/src/race';
import { IClassDef } from '../../src/lib/ve-pc/typings/class';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';
import { IRaceDef } from '../../src/lib/ve-pc/typings/race';

describe('Loader#getClass', () => {
  const name: string = 'fighter';
  const hitDice: number = 8;
  const attributes = [{
    key: 'strength',
    value: 1,
  }, {
    key: 'dexerety',
    value: 2,
  }, {
    key: 'constitution',
    value: 3,
  }];
  const habilities = [{
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
  }];
  const talents = [
    'talent1',
    'talent2',
  ];
  const progress = [{
    atk: 1,
    mp: 2,
    ins: 3,
  }];
  const classDef: IClassDef = {
    name,
    hit_dice: hitDice,
    priorities: {
      attributes,
      habilities,
    },
    talents,
    progress,
  };

  const fileTestConfig: IFileTestDefinition = {
    classDef,
  };

  const fileTest: IFileFactory = FileTest(fileTestConfig);
  const config: ILoaderConfig = {
    root: './',
    file: fileTest,
    locale: 'es',
  };
  const loader: ILoaderFactory = Loader(config);
  const cls: IClassFactory = loader.getClass('fighter');

  describe('returns a valid IClassFactory', () => {
    it('getName', () => {
      expect(cls.getName()).to.eql(name);
    });
    it('getAttributes', () => {
      expect(cls.getAttributes()).to.eql(attributes);
    });
    it('getHabilites', () => {
      expect(cls.getHabilites()).to.eql(habilities);
    });
    it('getTalents', () => {
      expect(cls.getTalents()).to.eql(talents);
    });
    it('getHitDice', () => {
      expect(cls.getHitDice()).to.eql(hitDice);
    });
    it('getProgress', () => {
      expect(cls.getProgress()).to.eql(progress);
    });
  });
});
