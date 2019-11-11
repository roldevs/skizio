import flyd from 'flyd';
import * as R from 'ramda';
import { IDropdownItem } from '../../../../ui/dropdown';

interface IVEFormModel {
  locale: string;
  class: string | null;
  race: string | null;
  level: 0;
  createBtnEnabled: boolean;
}

interface IVEFormModelFactory {
  init: (state: IVEFormModel) => void;
  setRace: (race: IDropdownItem) => void;
  setClass: (cls: IDropdownItem) => void;
  stream$: flyd.Stream<IVEFormModel>;
}

type TVEFormModel = () => IVEFormModelFactory;

const hasRace: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('race', model);

const hasClass: (model: IVEFormModel) => boolean =
  (model) => !!R.prop('class', model);

const setCreateButtonEnabled: (model: IVEFormModel) => IVEFormModel =
  (model) => R.set(R.lensProp('createBtnEnabled'), hasRace(model) && hasClass(model), model);

const VEFormModel: TVEFormModel = () => {
  const stream$: flyd.Stream<IVEFormModel> = flyd.stream();
  const init: (newState: IVEFormModel) => void = stream$;

  const streamModel: (model: IVEFormModel) => void =
    (model) => stream$(setCreateButtonEnabled(model));

  const setRace: (race: IDropdownItem) => void =
    (race) => streamModel(R.set(R.lensProp('race'), race.value, stream$()));

  const setClass: (cls: IDropdownItem) => void =
    (cls) => streamModel(R.set(R.lensProp('class'), cls.value, stream$()));

  return {
    init,
    setRace,
    setClass,
    stream$,
  };
};

export {
  IVEFormModel,
  IVEFormModelFactory,
  VEFormModel,
 };
