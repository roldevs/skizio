import R from 'ramda';
import { randomFromArray } from '../../common/utils';
import { IReputationItem } from '../typings/reputation';

interface IReputationFactory {
  pick: () => IReputationItem;
}

type TReputation = (reputations: IReputationItem[]) => IReputationFactory;

const Reputation: TReputation = (reputations) => {
  const reputationKey: any[] = R.keys(reputations);

  const pickReputationKey: () => any =
    () => randomFromArray(reputationKey);

  const pick: () => IReputationItem =
    () => reputations[pickReputationKey()];

  return {
    pick,
  };
};

export {
  IReputationFactory,
  TReputation,
  Reputation,
};
