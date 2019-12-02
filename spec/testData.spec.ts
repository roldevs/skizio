// tslint:disable:no-unused-expression
import Bluebird from 'bluebird';
import { expect } from 'chai';
import R from 'ramda';
import { IVEEnvClassInfo, IVEEnvFactory, IVEEnvRaceInfo, VEEnv } from '../src/lib/ve-pc/env';
import { IClassFactory } from '../src/lib/ve-pc/src/class';
import { FileLocal } from '../src/lib/ve-pc/src/file/local';
import { ILoaderFactory, Loader } from '../src/lib/ve-pc/src/loader';
import { IRaceFactory } from '../src/lib/ve-pc/src/race';
import { IFileFactory } from '../src/lib/ve-pc/typings/file';

const system: string = 've.jdr';
const file: IFileFactory = FileLocal({ root: './src/lib/ve-pc/' });

const testRace: (locale: string, loader: ILoaderFactory) => (raceData: IVEEnvRaceInfo) => () => void =
  (locale, loader) => (raceData) => () => {
    // tslint:disable-next-line:no-console
    console.log(`test Race: ${raceData.name} (${locale})`);
    const raceDef: IRaceFactory = loader.getRace(raceData.name);
    expect(raceDef.getName()).to.not.be.undefined;
    expect(raceDef.getLocalized()).to.not.be.undefined;
    expect(raceDef.getTalents(10)).to.not.be.undefined; // For big level
    expect(raceDef.getMovement()).to.not.be.undefined;
  };

const testClass: (locale: string, loader: ILoaderFactory) => (clsData: IVEEnvClassInfo) => void =
  (locale, loader) => (clsData) =>  {
    // tslint:disable-next-line:no-console
    console.log(`test Class: ${clsData.name} (${locale})`);
    const classDef: IClassFactory = loader.getClass(clsData.name);
    expect(classDef.getName()).to.not.be.undefined;
    expect(classDef.getLocalized()).to.not.be.undefined;
    expect(classDef.getTalents(10)).to.not.be.undefined; // For big level
    expect(classDef.getProgress()).to.not.be.undefined;
    expect(classDef.getHitDice()).to.not.be.undefined;
    expect(classDef.getHabilites()).to.not.be.undefined;
    expect(classDef.getAttributes()).to.not.be.undefined;
  };

const getLoader: (locale: string) => ILoaderFactory =
  (locale) => Loader({
    file,
    locale,
    system,
  });

const testLocale: (locale: string) => void =
  (locale) => {
    const loader: ILoaderFactory = getLoader(locale);
    const env: IVEEnvFactory = VEEnv({ system, file });
    return Bluebird.all([
      env.getRaces(locale),
      env.getClasses(locale),
    ]).then((result: Array<Array<IVEEnvRaceInfo | IVEEnvClassInfo>>) => {
      R.forEach(testRace(locale, loader), result[0]);
      R.forEach(testClass(locale, loader), result[1]);
    });
  };

describe('testData', () => {
  it('Testing', (done) => {
    Bluebird.map(
      ['en', 'es'],
      testLocale,
    ).then(() => done());
  });
});
