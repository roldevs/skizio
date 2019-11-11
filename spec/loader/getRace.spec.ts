// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { FileTest, IFileTestDefinition, TFileTest } from '../../src/lib/ve-pc/src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader, TLoader } from '../../src/lib/ve-pc/src/loader';
import { IRaceFactory } from '../../src/lib/ve-pc/src/race';
import { IClassDef } from '../../src/lib/ve-pc/typings/class';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';
import { IRaceDef } from '../../src/lib/ve-pc/typings/race';

describe('Loader#getRace', () => {
  const name: string = 'elf';
  const movement: number = 12;
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
  const raceDef: IRaceDef = {
    name,
    movement,
    priorities: {
      attributes,
      habilities,
    },
    talents,
  };

  const fileTestConfig: IFileTestDefinition = {
    raceDef,
  };

  const fileTest: IFileFactory = FileTest(fileTestConfig);
  const config: ILoaderConfig = {
    root: './',
    file: fileTest,
    locale: 'es',
  };
  const loader: ILoaderFactory = Loader(config);
  const race: IRaceFactory = loader.getRace('elf');

  describe('returns a valid IRaceFactory', () => {
    it('getName', () => {
      expect(race.getName()).to.eql(name);
    });
    it('getAttributes', () => {
      expect(race.getAttributes()).to.eql(attributes);
    });
    it('getHabilites', () => {
      expect(race.getHabilites()).to.eql(habilities);
    });
    it('getTalents', () => {
      expect(race.getTalents()).to.eql(talents);
    });
    it('getMovement', () => {
      expect(race.getMovement()).to.eql(movement);
    });
  });
});
