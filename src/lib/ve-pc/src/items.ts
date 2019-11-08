import R from 'ramda';
import {
  IItem,
} from '../typings/common';

interface IItemsConfig {
  itemsA: IItem[];
  itemsB: IItem[];
}

interface IItemsFactory {
  combinedSorted: IItem[];
}

type TItems = (config: IItemsConfig) => IItemsFactory;

const Items: TItems = (config) => {
  const updateValue: (list: IItem[], item: IItem, index: number) => () => IItem =
    (list, item, index) => () => {
      return {
        key: item.key,
        value: item.value + list[index].value,
      };
    };

  const updateListITem: (list: IItem[], item: IItem) => IItem[] =
    (list, item) => {
      const index: number = R.findIndex(R.propEq('key', item.key), list);
      if (index >= 0) {
        return R.adjust(index, updateValue(list, item, index), list);
      }
      return R.append(item, list);
    };

  const combined: IItem[] = R.reduce(updateListITem, config.itemsA, config.itemsB);

  const combinedSorted: IItem[] = R.sortBy(R.prop('value'), combined);

  return {
    combinedSorted,
  };
};

export {
  Items,
};
