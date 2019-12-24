import Bluebird = require('bluebird');
import { EGender } from './pc';

interface IImageFactory {
  pick: (gender: EGender) => Bluebird<string>;
}

export {
  IImageFactory,
};
