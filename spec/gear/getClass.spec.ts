// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { IClassFactory } from '../../src/lib/ve-pc/src/class';
import { FileTest, IFileTestDefinition } from '../../src/lib/ve-pc/src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader } from '../../src/lib/ve-pc/src/loader';
import { IClassDef } from '../../src/lib/ve-pc/typings/class';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';
import { ITalentDef } from '../../src/lib/ve-pc/typings/talent';

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
  const talents: ITalentDef = {
    1: ['talent1', 'talent2'],
  };
  const progress = [{
    atk: 1,
    mp: 2,
    ins: 3,
  }];
  const classDef: IClassDef = {
    name,
    localize: name,
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
    file: fileTest,
    locale: 'es',
    system: 've.jdr',
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
      expect(cls.getTalents(1)).to.have.members(['talent1', 'talent2']);
    });
    it('getHitDice', () => {
      expect(cls.getHitDice()).to.eql(hitDice);
    });
    it('getProgress', () => {
      expect(cls.getProgress()).to.eql(progress);
    });
  });
});
