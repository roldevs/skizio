import Bluebird from 'bluebird';
import R from 'ramda';
import { IFileFactory } from '../common/typings/file';
import { IClassFactory } from './src/class';
import { ILoaderFactory, Loader } from './src/loader';
import { IRaceFactory } from './src/race';

interface IVEEnvRaceInfo {
  name: string;
  localize: string;
}

interface IVEEnvClassInfo {
  name: string;
  localize: string;
}

interface IVEEnvConfig {
  system: string;
  file: IFileFactory;
}

interface IVEEnvFactory {
  getRaces: (locale: string) => Bluebird<IVEEnvRaceInfo[]>;
  getClasses: (locale: string) => Bluebird<IVEEnvClassInfo[]>;
}

type TVEEnv = (config: IVEEnvConfig) => IVEEnvFactory;

const VEEnv: TVEEnv =
  (config) => {
    const getLoader: (locale: string) => ILoaderFactory =
      (locale) => Loader({ file: config.file, locale, system: config.system });

    const dataBaseDir: string = `data/${config.system}/`;
    const removeExtension: (filename: string) => string =
      (filename) => filename.split('.').slice(0, -1).join('.');

    const getRaceInfo: (locale: string) => (name: string) => IVEEnvRaceInfo =
      (locale) => (name) => {
        const raceDef: IRaceFactory = getLoader(locale).getRace(name);
        return { name, localize: raceDef.getLocalized() };
      };

    const getClassInfo: (locale: string) => (name: string) => IVEEnvClassInfo =
      (locale) => (name) => {
        const classDef: IClassFactory = getLoader(locale).getClass(name);
        return { name, localize: classDef.getLocalized() };
      };

    const fromFileNameToInfo: (fnInfo: (name: string) => IVEEnvRaceInfo | IVEEnvClassInfo) =>
      (fileName: string) => IVEEnvRaceInfo | IVEEnvClassInfo =
        (fnInfo) => R.compose(fnInfo, removeExtension);

    const getRaces: (locale: string) => Bluebird<IVEEnvRaceInfo[]> =
      (locale) => config.file.listDir(`${dataBaseDir}${locale}/races/`).then(
        R.map(fromFileNameToInfo(getRaceInfo(locale))),
      );
    const getClasses: (locale: string) => Bluebird<IVEEnvClassInfo[]> =
      (locale) => config.file.listDir(`${dataBaseDir}${locale}/classes/`).then(
        R.map(fromFileNameToInfo(getClassInfo(locale))),
      );

    return {
      getRaces,
      getClasses,
    };
  };
export {
  IVEEnvClassInfo,
  IVEEnvRaceInfo,
  IVEEnvConfig,
  IVEEnvFactory,
  TVEEnv,
  VEEnv,
};
