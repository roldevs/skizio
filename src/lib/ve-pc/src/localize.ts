import R from 'ramda';
import { IPC } from '../typings/pc';
import { ITalentLocaleInfo } from '../typings/talent';
import { ILoaderFactory } from './loader';

interface ILocalizeData {
  loader: ILoaderFactory;
}

interface ILocalizeConfig {
  loader: ILoaderFactory;
}

interface ILocalizeFactory {
  pc: (pc: IPC) => IPC;
}

type TLocalize = (config: ILocalizeConfig) => ILocalizeFactory;

const Localize: TLocalize =
  (config) => {
    const talentsLocaleInfo: ITalentLocaleInfo = config.loader.getTalents();

    const getRace: (race: string) => string =
      (race) => config.loader.getRace(race).getLocalized();
    const getClass: (cls: string) => string =
      (cls) => config.loader.getClass(cls).getLocalized();
    const getTalent: (talent: string) => string =
      (talent) => R.view(R.lensPath([talent, 'title']), talentsLocaleInfo);
    const getTalents: (talents: string[]) => string[] =
      (talents) => [R.compose(R.join(', '), R.map(getTalent))(talents)];

    const pc: (pc: IPC) => IPC = R.evolve({
        race: getRace,
        class: getClass,
        talents: getTalents,
      });

    return {
      pc,
    };
  };

export {
  ILocalizeData,
  ILocalizeConfig,
  ILocalizeFactory,
  TLocalize,
  Localize,
};
