import R from 'ramda';
import { randomFromArray } from '../../common/utils';

interface IRandomItem<T> {
  item: T;
  priority: number;
}

interface IRandomFactory {
  pickFromList: <T>(items: Array<IRandomItem<T>>) => T | null;
  probabilityList: <T>(items: Array<IRandomItem<T>>) => T[];
}

type TRamdom = () => IRandomFactory;

const Random: TRamdom = () => {
  const getProperty = R.prop('priority');
  const getItem = R.prop('item');
  const getPriorities: <T>(items: Array<IRandomItem<T>>) => number[] = R.map(getProperty);
  const getMaxValue: (list: number[]) => any = R.reduce(R.max, -Infinity);
  const getMaxPriority: <T>(items: Array<IRandomItem<T>>) => number = R.compose(getMaxValue, getPriorities);
  const getRamdomItem: <T>(items: Array<IRandomItem<T>>) => T = (items) => getItem(randomFromArray(items));

  const pickFromList: <T>(items: Array<IRandomItem<T>>) => T | null =
    R.ifElse(R.isEmpty, R.always(null), getRamdomItem);

  const probabilityList: <T>(items: Array<IRandomItem<T>>) => T[] =
    (items) => R.reduce((acc: any[], value: IRandomItem<any>) => {
        const maxPriority = getMaxPriority(items);
        return R.concat(
          acc,
          R.repeat(value.item, (maxPriority - value.priority + 1)),
        );
      }, [], items);

  return {
    pickFromList,
    probabilityList,
  };
};

export {
  IRandomItem,
  IRandomFactory,
  Random,
};
