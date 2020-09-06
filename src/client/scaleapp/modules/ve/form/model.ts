import Bluebird from 'bluebird';
import flyd from 'flyd';
import * as R from 'ramda';
import { IVEEnvClassInfo, IVEEnvRaceInfo } from '../../../../../lib/ve-pc/env';
import { IServiceResult, IVEPCServiceResult } from '../../../../services/ve';
import { IDropdownItem } from '../../../../ui/dropdown';

interface IVEFormModel {
  loading: boolean;
  url: string;
  locale: string;
  classes: IVEEnvClassInfo[];
  races: IVEEnvRaceInfo[];
  class: string | null;
  race: string | null;
  level: number;
  createBtnEnabled: boolean;
  system: string;
  threeBonus: string;
}

interface IVEFormModelFactory {
  init: (state: IVEFormModel) => void;
  setSystem: (system: IDropdownItem) => void;
  setRace: (race: IDropdownItem) => void;
  setClass: (cls: IDropdownItem) => void;
  setBonus: (bonus: IDropdownItem) => void;
  setLevel: (level: IDropdownItem) => void;
  stream$: flyd.Stream<IVEFormModel>;
}

type TVEFormModel = (sb: any) => IVEFormModelFactory;

const hasRace: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('race', model);

const hasClass: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('class', model);

const setCreateButtonEnabled: (model: IVEFormModel) => IVEFormModel =
  (model) => R.set(R.lensProp('createBtnEnabled'), hasRace(model) && hasClass(model), model);

const setUrlLink: (model: IVEFormModel) => IVEFormModel =
  (model) => R.set(
    R.lensProp('url'),
    `/api/ve/pc/${model.locale}/${model.system}/${model.level}/${model.race}/${model.class}/sheet.png?threeBonus=${model.threeBonus === 'threeBonus'}&level=${model.level}`,
    model,
  );

const VEFormModel: TVEFormModel = (sb) => {
  const stream$: flyd.Stream<IVEFormModel> = flyd.stream();

  // tslint:disable-next-line:no-console
  flyd.on(console.log, stream$);

  const setLoading: (set: boolean) => (model: IVEFormModel) => IVEFormModel =
    (set) => R.set(R.lensProp('loading'), set);

  const streamLoading$: (set: boolean, model: IVEFormModel) => void =
    (set, model) => stream$(setLoading(set)(model));

  const getResult: (result: IServiceResult<IVEPCServiceResult>) => string[] = R.prop('data');

  const init: (newState: IVEFormModel) => void =
    (newState) => {
      // Load races and classes
      streamLoading$(true, newState);
      return Bluebird.all([
        sb.services.ve.races(newState.locale, newState.system),
        sb.services.ve.classes(newState.locale, newState.system),
      ]).then((result: IServiceResult<IVEPCServiceResult>[]) => {
        newState = R.set(R.lensProp('races'), getResult(result[0]), newState);
        newState = R.set(R.lensProp('classes'), getResult(result[1]), newState);
        streamLoading$(false, newState);
      });
    };

  const streamModel: (model: IVEFormModel) => void =
    (model) => stream$(R.compose(setUrlLink, setCreateButtonEnabled)(model));

  const setDropdownProp: (lense: string) => (system: IDropdownItem) => void =
    (lense) => (cls) => streamModel(R.set(R.lensProp(lense), cls.value, stream$()));

  const setSystem: (system: IDropdownItem) => void = setDropdownProp('system');
  const setRace: (race: IDropdownItem) => void = setDropdownProp('race');
  const setClass: (cls: IDropdownItem) => void = setDropdownProp('class');
  const setBonus: (bonus: IDropdownItem) => void = setDropdownProp('threeBonus');
  const setLevel: (level: IDropdownItem) => void = (level) => {
    // tslint:disable-next-line:no-console
    console.log('setLevel', level);
    setDropdownProp('level')(level);
  };

  return {
    init,
    setSystem,
    setRace,
    setClass,
    stream$,
    setBonus,
    setLevel,
  };
};

export {
  IVEFormModel,
  IVEFormModelFactory,
  VEFormModel,
 };
