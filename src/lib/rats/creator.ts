import Bluebird = require('bluebird');
import { Canvas, createCanvas } from 'canvas';
import { FileLocal } from '../common/file/local';
import { IFileFactory } from '../common/typings/file';
import { Attributes } from '../rats/src/attributes';
import { CanvasSheet, ICanvasSheetConfig } from '../rats/src/canvas/sheet';
import { ILoaderFactory, Loader } from '../rats/src/loader';
import { HitPoints } from '../rats/src/points/hitPoints';
import { GeneratedPhotosLocal } from './src/image/generatedPhotosLocal';
import { LocalNames } from './src/name/localNames';
import { IRatsPCFactory, RatsPC } from './src/pc';
import { SanityPoints } from './src/points/sanityPoints';
import { IImageFactory } from './typings/image';
import { EGender, IRatsPC } from './typings/pc';

interface IRatsCreatorConfig {
  locale: string;
  gender: EGender;
}

interface IRatsCreatorFactory {
  create: () => Bluebird<IRatsPC>;
  fillCanvas: () => Bluebird<Canvas>;
}

type TRatsCreator = (config: IRatsCreatorConfig) => IRatsCreatorFactory;

const RatsCreator: TRatsCreator =
  (config) => {
    const file: IFileFactory = FileLocal({ root: './src/lib/rats/' });
    const loader: ILoaderFactory = Loader({ file, locale: config.locale });
    const image: IImageFactory = GeneratedPhotosLocal({ loader });

    const pcCreator: IRatsPCFactory = RatsPC({
      attributes: Attributes(),
      hitPoints: HitPoints(),
      sanityPoints: SanityPoints(),
      gender: config.gender,
      profession: loader.getProfessions(),
      reputation: loader.getReputations(),
      gear: loader.getGear(),
      arms: loader.getArms(),
      image,
      name: LocalNames({ loader }),
    });

    const create: () => Bluebird<IRatsPC> = pcCreator.generate;

    const fillCanvas: () => Bluebird<Canvas> =
      () => {
        const canvas = createCanvas(736, 1044);
        const canvasConfig: ICanvasSheetConfig = {
          locale: config.locale,
          loader,
          canvas,
        };
        return pcCreator.generate().then(CanvasSheet(canvasConfig).fill);
      };

    return {
      create,
      fillCanvas,
    };
  };

export {
  IRatsCreatorConfig,
  IRatsCreatorFactory,
  TRatsCreator,
  RatsCreator,
};
