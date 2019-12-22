import { Canvas, createCanvas } from 'canvas';
import R from 'ramda';
import { FileLocal } from '../common/file/local';
import { IFileFactory } from '../common/typings/file';
import { Attributes, IAttributesFactory } from './src/attributes';
import { BonusThree } from './src/bonus/three';
import { BonusTwo } from './src/bonus/two';
import { CanvasSheet, ICanvasSheetConfig } from './src/canvas/sheet';
import { IClassFactory } from './src/class';
import { Dice } from './src/dice';
import { Gear, IGearFactory } from './src/gear';
import { Habilities, IHabilitiesFactory } from './src/habilities';
import { HitPoints, IHitPointsFactory } from './src/hit_points';
import { ILoaderConfig, ILoaderFactory, Loader } from './src/loader';
import { Localize } from './src/localize';
import { IPCCreateFactory, PCCreate } from './src/pc/create';
import { IPCIncreaseFactory, PCIncrease } from './src/pc/increase';
import { IProgressFactory, Progress } from './src/progress';
import { IRaceFactory } from './src/race';
import { TBonus } from './typings/bonus';
import { IPC } from './typings/pc';

interface IVEPCConfig {
  system: string;
  race: string;
  class: string;
  locale: string;
  root: string;
  threeBonus: boolean;
  level: number;
}

interface IVEPCFactory {
  fillCanvas: () => Promise<Canvas>;
}

type TVEPC = (config: IVEPCConfig) => IVEPCFactory;

const VEPC: TVEPC =
  (config) => {
    const file: IFileFactory = FileLocal({
      root: config.root,
    });
    const loaderConfig: ILoaderConfig = {
      file,
      locale: config.locale,
      system: config.system,
    };
    const loader: ILoaderFactory = Loader(loaderConfig);
    const gear: IGearFactory = Gear({ loader });
    const bonus: TBonus = !!config.threeBonus ? BonusThree : BonusTwo;
    const cls: IClassFactory = loader.getClass(config.class);
    const race: IRaceFactory = loader.getRace(config.race);
    const habilities: IHabilitiesFactory = Habilities({ class: cls });
    const attributes: IAttributesFactory = Attributes({ class: cls, bonus, dice: Dice });
    const creator: IPCCreateFactory = PCCreate({
      habilities,
      attributes,
      startHabilityPoints: 4,
      race,
      class: cls,
      dice: Dice,
      backgrounds: loader.getBackgrounds(),
      gear,
    });
    const canvas = createCanvas(1748, 2480);
    const canvasConfig: ICanvasSheetConfig = {
      loader,
      canvas,
    };
    const progress: IProgressFactory = Progress({ class: cls });
    const hitPoints: IHitPointsFactory = HitPoints({
      class: cls,
      dice: Dice,
    });
    const increaseLevel: IPCIncreaseFactory = PCIncrease({
      habilities,
      race,
      class: cls,
      progress,
      hitPoints,
    });
    const createLevel: (level: number) => (pc: IPC) => IPC =
      (level) => (pc) => {
        while (pc.level < level) {
          pc = increaseLevel.increase(pc);
        }
        return pc;
      };

    const fillCanvas: () => Promise<Canvas> =
      R.compose(
        CanvasSheet(canvasConfig).fill,
        Localize({ loader }).pc,
        createLevel(config.level),
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
