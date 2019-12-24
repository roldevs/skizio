import Bluebird = require('bluebird');
import { getRandomValue } from '../../../common/utils';
import { ILoaderFactory } from '../../../rats/src/loader';
import { IImageFactory } from '../../typings/image';
import { EGender } from '../../typings/pc';

interface IGeneratedPhotosLocalConfig {
  loader: ILoaderFactory;
}

// https://generated.photos/account#apikey
const GeneratedPhotosLocal: (options: IGeneratedPhotosLocalConfig) => IImageFactory =
  (options) => {
    const getPos: (gender: string) => number =
      (gender) => getRandomValue(options.loader.getGeneratedPhotosSize(gender));

    const pick: (gender: EGender) => Bluebird<string> =
      (gender) => options.loader.pickGeneratedPhotosUrl(gender, getPos(gender)) as Bluebird<string>;

    return {
      pick,
    };
  };

export {
  IGeneratedPhotosLocalConfig,
  GeneratedPhotosLocal,
};
