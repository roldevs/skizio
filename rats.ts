// tslint:disable:no-console
import { Canvas, createCanvas } from 'canvas';
import fs from 'fs';
import { FileLocal } from './src/lib/common/file/local';
import { IFileFactory } from './src/lib/common/typings/file';
import { Attributes } from './src/lib/rats/src/attributes';
import { CanvasSheet, ICanvasSheetConfig } from './src/lib/rats/src/canvas/sheet';
import { GeneratedPhotos } from './src/lib/rats/src/image/generatedPhotos';
import { GeneratedPhotosLocal } from './src/lib/rats/src/image/generatedPhotosLocal';
import { TestImages } from './src/lib/rats/src/image/test';
import { ILoaderFactory, Loader } from './src/lib/rats/src/loader';
import { UINames } from './src/lib/rats/src/name/uinames';
import { IRatsPCFactory, RatsPC } from './src/lib/rats/src/pc';
import { HitPoints } from './src/lib/rats/src/points/hitPoints';
import { SanityPoints } from './src/lib/rats/src/points/sanityPoints';
import { IImageFactory } from './src/lib/rats/typings/image';
import { EGender, IRatsPC } from './src/lib/rats/typings/pc';

const i: IImageFactory = GeneratedPhotos({
  key: '_fxfs5_dOlXHyAAKcSwAuw',
  imgIndex: 4,
});

const v: IImageFactory = TestImages();

v.pick(EGender.female).then(console.log);

const locale: string = 'es';
const file: IFileFactory = FileLocal({
  root: './src/lib/rats/',
});

const loader: ILoaderFactory = Loader({ file, locale });

const il: IImageFactory = GeneratedPhotosLocal({ loader });

const pcCreator: IRatsPCFactory = RatsPC({
  gender: EGender.female,
  attributes: Attributes(),
  hitPoints: HitPoints(),
  sanityPoints: SanityPoints(),
  profession: loader.getProfessions(),
  reputation: loader.getReputations(),
  gear: loader.getGear(),
  arms: loader.getArms(),
  image: il,
  name: UINames({ region: 'England' }),
});

pcCreator.generate().then((pc: IRatsPC) => {
  const canvas = createCanvas(736, 1044);
  const canvasConfig: ICanvasSheetConfig = {
    locale,
    loader,
    canvas,
  };
  CanvasSheet(canvasConfig).fill(pc).then((c: Canvas) => {
    const out = fs.createWriteStream(__dirname + '/test.png');
    const stream = c.createPNGStream();
    stream.pipe(out);
    // tslint:disable-next-line:no-console
    out.on('finish', () =>  console.log('The PNG file was created.'));
  });
  return pc;
});
