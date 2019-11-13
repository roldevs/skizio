import { Canvas, createCanvas } from 'canvas';
import R from 'ramda';
import { BonusThree } from './src/bonus/three';
import { BonusTwo } from './src/bonus/two';
import { CanvasSheet, ICanvasSheetConfig, ICanvasSheetFactory } from './src/canvas/sheet';
import { Dice } from './src/dice';
import { FileLocal } from './src/file/local';
import { Gear, IGearFactory } from './src/gear';
import { ILoaderConfig, ILoaderFactory, Loader } from './src/loader';
import { Localize } from './src/localize';
import { IPCCreateFactory, PCCreate } from './src/pc/create';
import { TBonus } from './typings/bonus';
import { IFileFactory } from './typings/file';

interface IVEPCConfig {
  system: string;
  race: string;
  class: string;
  locale: string;
  root: string;
  threeBonus: boolean;
}

interface IVEPCFactory {
  fillCanvas: () => Promise<Canvas>;
}

type TVEPC = (config: IVEPCConfig) => IVEPCFactory;

const VEPC: TVEPC =
  (config) => {
    const file: IFileFactory = FileLocal();
    const loaderConfig: ILoaderConfig = {
      root: config.root,
      file,
      locale: config.locale,
      system: config.system,
    };
    const loader: ILoaderFactory = Loader(loaderConfig);
    const gear: IGearFactory = Gear({ loader });
    const bonus: TBonus = !!config.threeBonus ? BonusThree : BonusTwo;
    const creator: IPCCreateFactory = PCCreate({
      startHabilityPoints: 4,
      race: loader.getRace(config.race),
      class: loader.getClass(config.class),
      dice: Dice,
      backgrounds: loader.getBackgrounds(),
      gear,
      bonus,
    });
    const canvas = createCanvas(1748, 2480);
    const canvasConfig: ICanvasSheetConfig = {
      loader,
      canvas,
    };
    const fillCanvas: () => Promise<Canvas> =
      R.compose(
        CanvasSheet(canvasConfig).fill,
        Localize({ loader }).pc,
        creator.generate,
      );

    return {
      fillCanvas,
    };
  };
export {
  IVEPCConfig,
  IVEPCFactory,
  TVEPC,
  VEPC,
};
