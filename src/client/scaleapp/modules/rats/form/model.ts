import Bluebird from 'bluebird';
import flyd from 'flyd';
import * as R from 'ramda';
import { EGender } from '../../../../../lib/rats/typings/pc';
import { IDropdownItem } from '../../../../ui/dropdown';

interface IRatsFormModel {
  loading: boolean;
  url: string;
  locale: string;
  createBtnEnabled: boolean;
  gender: EGender;
}

interface IRatsFormModelFactory {
  init: (state: IRatsFormModel) => void;
  setGender: (system: IDropdownItem) => void;
  stream$: flyd.Stream<IRatsFormModel>;
}

type TRatsFormModel = (sb: any) => IRatsFormModelFactory;

const hasGender: (model: IRatsFormModel) => boolean =
  (model) => !!R.prop('gender', model);

const setCreateButtonEnabled: (model: IRatsFormModel) => IRatsFormModel =
  (model) => R.set(R.lensProp('createBtnEnabled'), hasGender(model), model);

const setUrlLink: (model: IRatsFormModel) => IRatsFormModel =
  (model) => R.set(
      R.lensProp('url'),
      `/api/rats/${model.locale}/sheet.png?gender=${model.gender}`,
      model,
    );

const RatsFormModel: TRatsFormModel = () => {
  const stream$: flyd.Stream<IRatsFormModel> = flyd.stream();

  // tslint:disable-next-line:no-console
  flyd.on(console.log, stream$);

  const streamModel: (model: IRatsFormModel) => void =
    (model) => stream$(R.compose(setUrlLink, setCreateButtonEnabled)(model));

  const init: (newState: IRatsFormModel) => void = streamModel;

  const setDropdownProp: (lense: string) => (system: IDropdownItem) => void =
    (lense) => (cls) => streamModel(R.set(R.lensProp(lense), cls.value, stream$()));

  const setGender: (gender: IDropdownItem) => void = setDropdownProp('gender');

  return {
    init,
    setGender,
    stream$,
  };
};

export {
  IRatsFormModel,
  IRatsFormModelFactory,
  RatsFormModel,
 };
