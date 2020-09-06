import Bluebird from 'bluebird';
import R from 'ramda';
import { IFileFactory } from '../../common/typings/file';
import { ICanvasElement } from '../../ve-pc/src/canvas/sheet';
import { Arm, IArmFactory } from './arm';
import { Gear, IGearFactory } from './gear';
import { IProfessionFactory, Profession } from './profession';
import { IReputationFactory, Reputation } from './reputation';

interface ILoaderConfig {
  file: IFileFactory;
  locale: string;
}

interface ILoaderFactory {
  getReputations: () => IReputationFactory;
  getProfessions: () => IProfessionFactory;
  getGear: () => IGearFactory;
  getArms: () => IArmFactory;
  getCanvasSheetData: () => ICanvasElement[];
  getCanvasSheetImagePath: () => string;
  getGeneratedPhotosSize: (gender: string) => number;
  pickGeneratedPhotosUrl: (gender: string, pos: number) => Bluebird<string>;
  getGeneratedNameSize: (gender: string) => number;
  pickGeneratedName: (gender: string, pos: number) => Bluebird<string>;
}

type TLoader = (config: ILoaderConfig) => ILoaderFactory;

const Loader: TLoader = (config) => {
  const dataBaseDir: string = `data/${config.locale}/`;

  const getPath: (name: string) => () => string =
    (name) => () => `${dataBaseDir}${name}.yml`;

  const getProfessions: () => IProfessionFactory =
    () => R.compose(Profession, config.file.loadYAML, getPath('professions'))();

  const getReputations: () => IProfessionFactory =
    R.compose(Reputation, config.file.loadYAML, getPath('reputations'));

  const getGear: () => IGearFactory =
    R.compose(Gear, config.file.loadYAML, getPath('gear'));

  const getArms: () => IArmFactory =
    R.compose(Arm, config.file.loadYAML, getPath('arms'));

  const canvasSheetDataPath: () => string =
    () => `${dataBaseDir}canvas_sheet.yml`;

  const getCanvasSheetImagePath: () => string =
    () => config.file.addRoot(`${dataBaseDir}sheet.png`);

  const getCanvasSheetData: () => ICanvasElement[] =
      R.compose(config.file.loadYAML, canvasSheetDataPath);

  const getGeneratedPhotosPath: (gender: string) => string =
    (gender) => `data/images/${gender}.txt`;

  const getGeneratedNamePath: (gender: string) => string =
    (gender) => `data/names/${gender}.txt`;

  const getGeneratedPhotosSize: (gender: string) => number =
    (gender) => config.file.fileSize(getGeneratedPhotosPath(gender));

  const pickGeneratedPhotosUrl: (gender: string, pos: number) => Bluebird<string> =
    (gender, pos) => config.file.pickLine(getGeneratedPhotosPath(gender), pos);

  const getGeneratedNameSize: (gender: string) => number =
    (gender) => config.file.fileSize(getGeneratedNamePath(gender));

  const pickGeneratedName: (gender: string, pos: number) => Bluebird<string> =
    (gender, pos) => config.file.pickLine(getGeneratedNamePath(gender), pos);

  return {
    getReputations,
    getProfessions,
    getGear,
    getArms,
    getCanvasSheetData,
    getCanvasSheetImagePath,
    getGeneratedPhotosSize,
    pickGeneratedPhotosUrl,
    getGeneratedNameSize,
    pickGeneratedName,
  };
};

export {
  ILoaderConfig,
  ILoaderFactory,
  TLoader,
  Loader,
};
