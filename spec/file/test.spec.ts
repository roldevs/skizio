// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { FileTest, IFileTestDefinition } from '../../src/lib/ve-pc/src/file/test';

describe('FileTest#getRaces', () => {
  const races: string[] = ['elve', 'dwarf', 'halfling'];
  const classes: string[] = ['fighter', 'magic-user', 'rogue'];
  const definition: IFileTestDefinition = { races, classes };
  it('returns passed races', () => {
    expect(FileTest(definition).listDir('races')).to.eql(races);
  });
  it('returns passed classes', () => {
    expect(FileTest(definition).listDir('classes')).to.eql(classes);
  });
});
