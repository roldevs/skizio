// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { FileTest, IFileTestDefinition } from '../../src/file/test';
import { ILoaderConfig, ILoaderFactory, Loader } from '../../src/loader';
import { IFileFactory } from '../../typings/file';

describe('Loader#getClasses', () => {
  const classesFilename: string[] = ['fighter.yml', 'magic-user.yml', 'rogue.yml'];
  const classes: string[] = ['fighter', 'magic-user', 'rogue'];
  const fileTestConfig: IFileTestDefinition = { classes: classesFilename };

  const fileTest: IFileFactory = FileTest(fileTestConfig);
  const config: ILoaderConfig = {
    root: './',
    file: fileTest,
    locale: 'es',
  };
  const loader: ILoaderFactory = Loader(config);
  it('returns expected classes', () => {
    expect(loader.getClasses()).to.eql(classes);
  });
});
