import R from 'ramda';
import { ITalentDef } from '../typings/talent';

interface ITalentConfig {
  talents: ITalentDef;
}

interface ITalentFactory {
  get: (level: number) => string[];
}

type TTalent = (config: ITalentConfig) => ITalentFactory;

const Talent: TTalent =
  (config) => {
    const levels: () => number[] = () => R.keys(config.talents);
    const get: (level: number) => string[] =
      (level) => {
        return R.reduce((acc: string[], l: number) => {
          if (l <= level) {
            return R.concat(acc, config.talents[l]);
          }
          return acc;
        }, [], levels());
      };

    return {
      get,
    };
  };

export {
  ITalentConfig,
  ITalentFactory,
  TTalent,
  Talent,
};
