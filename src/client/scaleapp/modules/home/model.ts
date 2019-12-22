import Bluebird from 'bluebird';
import flyd from 'flyd';
import * as R from 'ramda';

interface IHomeModel {
  locale: string;
}

interface IHomeModelFactory {
  init: (state: IHomeModel) => void;
  stream$: flyd.Stream<IHomeModel>;
}

type THomeModel = (sb: any) => IHomeModelFactory;

const HomeModel: THomeModel = () => {
  const stream$: flyd.Stream<IHomeModel> = flyd.stream();
  const streamModel: (model: IHomeModel) => void = stream$;
  const init: (newState: IHomeModel) => void = streamModel;

  return {
    init,
    stream$,
  };
};

export {
  IHomeModel,
  IHomeModelFactory,
  HomeModel,
 };
