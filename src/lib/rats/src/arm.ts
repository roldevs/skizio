import { randomFromArray } from '../../common/utils';
import { IArmItem } from '../typings/arm';

interface IArmFactory {
  pick: () => IArmItem;
}

type TArm = (arms: IArmItem[]) => IArmFactory;

const Arm: TArm = (arms: IArmItem[]) => {
  const pick: () => IArmItem =
    () => randomFromArray(arms);

  return {
    pick,
  };
};

export {
  IArmFactory,
  TArm,
  Arm,
};
