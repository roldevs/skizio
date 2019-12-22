import R from 'ramda';
import { randomFromArray } from '../../common/utils';
import { IProfessionItem } from '../typings/profession';

interface IProfessionFactory {
  pick: () => IProfessionItem;
}

type TProfession = (professions: IProfessionItem[]) => IProfessionFactory;

const Profession: TProfession = (professions) => {
  const professionKey: any[] = R.keys(professions);

  const pickProfessionKey: () => any =
    () => randomFromArray(professionKey);

  const pick: () => IProfessionItem =
    () => professions[pickProfessionKey()];

  return {
    pick,
  };
};

export {
  IProfessionFactory,
  TProfession,
  Profession,
};
