import R from 'ramda';
import { IHash, IItem } from '../typings/common';
import { IClassFactory } from './class';
import { Items } from './items';
import { IRandomFactory, IRandomItem, Random } from './random';

interface IHabilitiesConfig {
  class: IClassFactory;
}

interface IHabilitiesFactory {
  initial: (points: number) => IHash;
  increase: (habilities: IHash) => IHash;
}

const Habilities: (config: IHabilitiesConfig) => IHabilitiesFactory =
  (config) => {
    const forEachIndexed = R.addIndex<string>(R.forEach);

    const habilitiesKeys: () => string[] =
      () => R.map(R.prop('key'), Items({
          items: config.class.getHabilites(),
        }).sorted);

    const initial: (points: number) => IHash =
      (points) => {
        const keys: string[] = habilitiesKeys();
        const habilities: IHash = {};
        const setHability: (item: string, idx: number) => void =
          (item, idx) => habilities[item] = (idx < points ? 1 : 0);
        forEachIndexed(setHability, keys);
        return habilities;
      };

    const getRandomItem: (item: IItem) => IRandomItem<string> = (item) => {
      return {
        item: item.key,
        priority: item.value,
      };
    };

    const pickHability: () => string | null = () => {
      const random: IRandomFactory = Random();
      const items: Array<IRandomItem<string>> = R.map(getRandomItem, config.class.getHabilites());
      return random.pickFromList(items);
    };

    const checkLimit: (habilities: IHash) => boolean = R.compose(R.all(R.equals(10)), R.values);

    const increase: (habilities: IHash) => IHash =
      (habilities) => {
        let key: string | null;
        if (checkLimit(habilities)) {
          return habilities;
        }

        while (true) {
          key = pickHability();
          if (!key) {
            return habilities;
          }

          if (habilities[key] < 10) {
            return R.set(R.lensProp(key), habilities[key] + 1, habilities);
          }
        }
      };

    return {
      initial,
      increase,
    };
  };

export {
  IHabilitiesConfig,
  IHabilitiesFactory,
  Habilities,
};
