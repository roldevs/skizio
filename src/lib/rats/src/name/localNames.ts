import Bluebird = require('bluebird');
import { getRandomValue } from '../../../common/utils';
import { INameFactory } from '../../typings/name';
import { EGender } from '../../typings/pc';
import { ILoaderFactory } from '../loader';

interface ILocalNamesConfig {
  loader: ILoaderFactory;
}

const LocalNames: (config: ILocalNamesConfig) => INameFactory =
  (config) => {
    const getPos: (gender: string) => number =
      (gender) => getRandomValue(config.loader.getGeneratedNameSize(gender));

    const pick: (gender: EGender) => Bluebird<string> =
      (gender) => config.loader.pickGeneratedName(gender, getPos(gender)) as Bluebird<string>;

    return {
      pick,
    };
  };

export {
  LocalNames,
};
