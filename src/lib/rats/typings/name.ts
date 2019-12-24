import Bluebird = require('bluebird');
import { EGender } from './pc';

interface INameFactory {
  pick: (gender: EGender) => Bluebird<string>;
}

export {
  INameFactory,
};
