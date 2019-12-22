// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { FileTest, IFileTestDefinition } from '../../../src/lib/ve-pc/src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader } from '../../../src/lib/ve-pc/src/loader';
import { IRaceFactory } from '../../../src/lib/ve-pc/src/race';
import { IRaceDef } from '../../../src/lib/ve-pc/typings/race';
import { ITalentDef } from '../../../src/lib/ve-pc/typings/talent';

describe('Loader#getRace', () => {
  const name: string = 'elf';
  const movement: number = 12;
  const talents: ITalentDef = {
    1: ['talent1', 'talent2'],
  };
  const raceDef: IRaceDef = {
    name,
    localize: name,
    movement,
    talents,
  };

  const fileTestConfig: IFileTestDefinition = {
    raceDef,
  };

  const fileTest: IFileFactory = FileTest(fileTestConfig);
  const config: ILoaderConfig = {
    file: fileTest,
    locale: 'es',
    system: 've.jdr',
  };
  const loader: ILoaderFactory = Loader(config);
  const race: IRaceFactory = loader.getRace('elf');

  describe('returns a valid IRaceFactory', () => {
    it('getName', () => {
      expect(race.getName()).to.eql(name);
    });
    it('getTalents', () => {
      expect(race.getTalents(1)).to.have.members(['talent1', 'talent2']);
    });
    it('getMovement', () => {
      expect(race.getMovement()).to.eql(movement);
    });
  });
});
