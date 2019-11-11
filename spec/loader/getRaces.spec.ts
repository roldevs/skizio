// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { FileTest, IFileTestDefinition } from '../../src/lib/ve-pc/src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader } from '../../src/lib/ve-pc/src/loader';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';

describe('Loader#getRaces', () => {
  const racesFilename: string[] = ['elf.yml', 'dwarf.yml', 'halfling.yml', 'human.yml'];
  const races: string[] = ['elf', 'dwarf', 'halfling', 'human'];
  const fileTestConfig: IFileTestDefinition = { races: racesFilename };

  const fileTest: IFileFactory = FileTest(fileTestConfig);
  const config: ILoaderConfig = {
    root: './',
    file: fileTest,
    locale: 'es',
  };
  const loader: ILoaderFactory = Loader(config);
  it('returns expected races', () => {
    expect(loader.getRaces()).to.eql(races);
  });
});
