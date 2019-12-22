import Bluebird from 'bluebird';
import flyd from 'flyd';
import * as R from 'ramda';

interface ILayoutModel {
  locale: string;
}

interface ILayoutModelFactory {
  init: (state: ILayoutModel) => void;
  stream$: flyd.Stream<ILayoutModel>;
}

type TLayoutModel = (sb: any) => ILayoutModelFactory;

const LayoutModel: TLayoutModel = () => {
  const stream$: flyd.Stream<ILayoutModel> = flyd.stream();
  const streamModel: (model: ILayoutModel) => void = stream$;
  const init: (newState: ILayoutModel) => void = streamModel;

  return {
    init,
    stream$,
  };
};

export {
  ILayoutModel,
  ILayoutModelFactory,
  LayoutModel,
 };
