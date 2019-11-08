import { Canvas, loadImage } from 'canvas';
import R from 'ramda';
import { IHash } from '../typings/common';
import { IPC } from '../typings/pc';
import { ILoaderFactory } from './loader';

interface ILocalizeData {
  races: IHash;
  classes: IHash;
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
    const localizeData: ILocalizeData = config.loader.getLocalizeData();

    const getRace: (race: string) => string =
      (race) => R.view(R.lensPath(['races', race]), localizeData);
    const getClass: (cls: string) => string =
      (cls) => R.view(R.lensPath(['classes', cls]), localizeData);
    const getTalent: (talent: string) => string =
      (talent) => R.view(R.lensPath(['talents', talent]), localizeData);
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
