import R from 'ramda';
import {
  IItem,
} from '../typings/common';

interface IItemsConfig {
  items: IItem[];
}

interface IItemsFactory {
  sorted: IItem[];
}

type TItems = (config: IItemsConfig) => IItemsFactory;

const Items: TItems = (config) => {
  const sorted: IItem[] = R.sortBy(R.prop('value'), config.items);

  return {
    sorted,
  };
};

export {
  Items,
};
