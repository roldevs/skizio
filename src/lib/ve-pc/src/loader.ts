import R from 'ramda';
import { IFileFactory } from '../typings/file';
import { ICanvasElement } from './canvas/sheet';
import { Class, IClassFactory } from './class';
import { IArm, IArmor } from './gear';
import { ILocalizeData } from './localize';
import { IRaceFactory, Race } from './race';

interface ILoaderConfig {
  root: string;
  file: IFileFactory;
  locale: string;
  system: string;
}

interface ILoaderFactory {
  getRaces: () => string[];
  getClasses: () => string[];
  getRace: (race: string) => IRaceFactory;
  getClass: (className: string) => IClassFactory;
  getBackgrounds: () => string[];
  getCanvasSheetData: () => ICanvasElement[];
  getCanvasSheetImagePath: () => string;
  getLocalizeData: () => ILocalizeData;
  getStrengthArms: () => IArm[];
  getDexeretyArms: () => IArm[];
  getArmors: () => IArmor[];
}

type TLoader = (config: ILoaderConfig) => ILoaderFactory;

const Loader: TLoader = (config) => {
  const dataBaseDir: string = `${config.root}data/${config.system}/`;

  const baseRaceDir: string = `${dataBaseDir}races/`;
  const baseClassDir: string = `${dataBaseDir}classes/`;
  const baseGearDir: string = `${dataBaseDir}locales/${config.locale}/gear/`;

  const localizePath: () => string =
    () => `${dataBaseDir}locales/${config.locale}/localize.yml`;

  const classPath: (className: string) => string =
    (className) => `${baseClassDir}${className}.yml`;

  const racePath: (race: string) => string =
    (race) => `${baseRaceDir}${race}.yml`;

  const canvasSheetDataPath: () => string =
    () => `${dataBaseDir}locales/${config.locale}/canvas_sheet.yml`;

  const getCanvasSheetImagePath: () => string =
    () => `${dataBaseDir}locales/${config.locale}/sheet.png`;

  const backgroundPath: string =
    `${dataBaseDir}locales/${config.locale}/backgrounds.yml`;

  const getStrengthArmPath: () => string =
    () => `${baseGearDir}strength.yml`;

  const getDexeretyArmPath: () => string =
    () => `${baseGearDir}dexerety.yml`;

  const getArmorsPath: () => string =
    () => `${baseGearDir}armors.yml`;

  const removeExtension: (filename: string) => string =
    (filename) => filename.split('.').slice(0, -1).join('.');

  const getRaces: () => string[] =
    () => R.map(removeExtension, config.file.listDir(baseRaceDir));

  const getClasses: () => string[] =
    () => R.map(removeExtension, config.file.listDir(baseClassDir));

  const getRace: (race: string) => IRaceFactory =
    R.compose(Race, config.file.loadYAML, racePath);

  const getClass: (className: string) => IClassFactory =
    R.compose(Class, config.file.loadYAML, classPath);

  const getCanvasSheetData: () => ICanvasElement[] =
      R.compose(config.file.loadYAML, canvasSheetDataPath);

  const getBackgrounds: () => string[] =
    () => config.file.loadYAML(backgroundPath);

  const getLocalizeData: () => ILocalizeData =
    R.compose(config.file.loadYAML, localizePath);

  const getStrengthArms: () => IArm[] =
    R.compose(config.file.loadYAML, getStrengthArmPath);

  const getDexeretyArms: () => IArm[] =
    R.compose(config.file.loadYAML, getDexeretyArmPath);

  const getArmors: () => IArmor[] =
    R.compose(config.file.loadYAML, getArmorsPath);

  return {
    getRaces,
    getClasses,
    getRace,
    getClass,
    getBackgrounds,
    getCanvasSheetData,
    getCanvasSheetImagePath,
    getLocalizeData,
    getStrengthArms,
    getDexeretyArms,
    getArmors,
  };
};

export {
  ILoaderConfig,
  ILoaderFactory,
  TLoader,
  Loader,
};
