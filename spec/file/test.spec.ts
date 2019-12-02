// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { FileTest, IFileTestDefinition } from '../../src/lib/ve-pc/src/file/test';

describe('FileTest#getRaces', () => {
  const races: string[] = ['elve', 'dwarf', 'halfling'];
  const classes: string[] = ['fighter', 'magic-user', 'rogue'];
  const definition: IFileTestDefinition = { races, classes };
  it('returns passed races', (done: any) => {
    FileTest(definition).listDir('races').then((racesRet: string[]) => {
      expect(racesRet).to.eql(races);
      done();
    });
  });
  it('returns passed classes', (done: any) => {
    FileTest(definition).listDir('classes').then((classesRet: string[]) => {
      expect(classes).to.eql(classesRet);
      done();
    });
  });
});
