import R from 'ramda';
import { IFileFactory } from '../../common/typings/file';
import { ITalentLocaleInfo } from '../typings/talent';
import { ICanvasElement } from './canvas/sheet';
import { Class, IClassFactory } from './class';
import { IArm, IArmor } from './gear';
import { ILocalizeData } from './localize';
import { IRaceFactory, Race } from './race';

interface ILoaderConfig {
  file: IFileFactory;
  locale: string;
  system: string;
}

interface ILoaderFactory {
  getRace: (race: string) => IRaceFactory;
  getClass: (className: string) => IClassFactory;
  getBackgrounds: () => string[];
  getCanvasSheetData: () => ICanvasElement[];
  getCanvasSheetImagePath: () => string;
  getLocalizeData: () => ILocalizeData;
  getStrengthArms: () => IArm[];
  getDexeretyArms: () => IArm[];
  getArmors: () => IArmor[];
  getTalents: () => ITalentLocaleInfo;
}

type TLoader = (config: ILoaderConfig) => ILoaderFactory;

const Loader: TLoader = (config) => {
  const dataBaseDir: string = `data/${config.system}/${config.locale}/`;

  const baseRaceDir: string = `${dataBaseDir}races/`;
  const baseClassDir: string = `${dataBaseDir}classes/`;
  const baseGearDir: string = `${dataBaseDir}gear/`;

  const localizePath: () => string =
    () => `${dataBaseDir}localize.yml`;

  const classPath: (className: string) => string =
    (className) => `${baseClassDir}${className}.yml`;

  const racePath: (race: string) => string =
    (race) => `${baseRaceDir}${race}.yml`;

  const canvasSheetDataPath: () => string =
    () => `${dataBaseDir}canvas_sheet.yml`;

  const getCanvasSheetImagePath: () => string =
    () => config.file.addRoot(`${dataBaseDir}sheet.png`);

  const backgroundPath: string =
    `${dataBaseDir}backgrounds.yml`;

  const getStrengthArmPath: () => string =
    () => `${baseGearDir}strength.yml`;

  const getDexeretyArmPath: () => string =
    () => `${baseGearDir}dexerety.yml`;

  const getArmorsPath: () => string =
    () => `${baseGearDir}armors.yml`;

  const getTalentsPath: () => string =
    () => `${dataBaseDir}talents.yml`;

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

  const getTalents: () => ITalentLocaleInfo =
    R.compose(config.file.loadYAML, getTalentsPath);

  return {
    getRace,
    getClass,
    getBackgrounds,
    getCanvasSheetData,
    getCanvasSheetImagePath,
    getLocalizeData,
    getStrengthArms,
    getDexeretyArms,
    getArmors,
    getTalents,
  };
};

export {
  ILoaderConfig,
  ILoaderFactory,
  TLoader,
  Loader,
};
