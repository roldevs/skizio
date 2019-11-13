import flyd from 'flyd';
import * as R from 'ramda';
import { IDropdownItem } from '../../../../ui/dropdown';

interface IVEFormModel {
  url: string;
  locale: string;
  class: string | null;
  race: string | null;
  level: 0;
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
  stream$: flyd.Stream<IVEFormModel>;
}

type TVEFormModel = () => IVEFormModelFactory;

const hasRace: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('race', model);

const hasClass: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('class', model);

const setCreateButtonEnabled: (model: IVEFormModel) => IVEFormModel =
  (model) => R.set(R.lensProp('createBtnEnabled'), hasRace(model) && hasClass(model), model);

const setUrlLink: (model: IVEFormModel) => IVEFormModel =
  (model) => R.set(
    R.lensProp('url'),
    `/api/ve/pc/${model.locale}/${model.system}/${model.level}/${model.race}/${model.class}/sheet.png?threeBonus=${model.threeBonus === 'threeBonus'}`,
    model,
  );

const VEFormModel: TVEFormModel = () => {
  const stream$: flyd.Stream<IVEFormModel> = flyd.stream();
  const init: (newState: IVEFormModel) => void = stream$;

  const streamModel: (model: IVEFormModel) => void =
    (model) => stream$(R.compose(setUrlLink, setCreateButtonEnabled)(model));

  const setDropdownProp: (lense: string) => (system: IDropdownItem) => void =
    (lense) => (cls) => streamModel(R.set(R.lensProp(lense), cls.value, stream$()));

  const setSystem: (system: IDropdownItem) => void = setDropdownProp('system');
  const setRace: (race: IDropdownItem) => void = setDropdownProp('race');
  const setClass: (cls: IDropdownItem) => void = setDropdownProp('class');
  const setBonus: (bonus: IDropdownItem) => void = setDropdownProp('threeBonus');

  return {
    init,
    setSystem,
    setRace,
    setClass,
    stream$,
    setBonus,
  };
};

export {
  IVEFormModel,
  IVEFormModelFactory,
  VEFormModel,
 };
