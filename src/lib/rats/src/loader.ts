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

  return {
    getReputations,
    getProfessions,
    getGear,
    getArms,
    getCanvasSheetData,
    getCanvasSheetImagePath,
  };
};

export {
  ILoaderConfig,
  ILoaderFactory,
  TLoader,
  Loader,
};
