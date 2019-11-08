import R from 'ramda';
import { IClassProgressItem } from '../typings/class';
import { IClassFactory } from './class';
import { IRaceFactory } from './race';

interface IProgressConfig {
  class: IClassFactory;
}

interface IProgressFactory {
  get: (level: number) => IClassProgressItem | undefined;
}

const Progress: (config: IProgressConfig) => IProgressFactory =
  (config) => {
    const get: (level: number) => IClassProgressItem | undefined =
      (level) => R.nth(
        level - 1,
        config.class.getProgress(),
      );
    return {
      get,
    };
  };

export {
  IProgressConfig,
  IProgressFactory,
  Progress,
};
