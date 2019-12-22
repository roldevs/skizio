import Bluebird = require('bluebird');
import R from 'ramda';
import { IImageFactory } from '../typings/image';
import { INameFactory } from '../typings/name';
import { EGender, IRatsPC } from '../typings/pc';
import { IArmFactory } from './arm';
import { IAttributesFactory } from './attributes';
import { IGearFactory } from './gear';
import { IHitPointsFactory } from './points/hitPoints';
import { ISanityPointsFactory } from './points/sanityPoints';
import { IProfessionFactory } from './profession';
import { IReputationFactory } from './reputation';

interface IRatsPCConfig {
  attributes: IAttributesFactory;
  hitPoints: IHitPointsFactory;
  sanityPoints: ISanityPointsFactory;
  gender: EGender;
  profession: IProfessionFactory;
  reputation: IReputationFactory;
  gear: IGearFactory;
  arms: IArmFactory;
  image: IImageFactory;
  name: INameFactory;
}

interface IRatsPCFactory {
  generate: () => Bluebird<IRatsPC>;
}

type TRatsPC = (config: IRatsPCConfig) => IRatsPCFactory;

const RatsPC: TRatsPC = (config) => {
  const calculatePoints: (pc: IRatsPC) => IRatsPC =
    R.compose(
      config.sanityPoints.calculate,
      config.hitPoints.calculate,
      config.attributes.fill(5),
    );

  const generate: () => Bluebird<IRatsPC> =
    () => {
      return Bluebird.all([
        config.name.pick(config.gender),
        config.image.pick(config.gender),
      ]).then((result: string[]) => {
        return {
          brawn: 0,
          dexterity: 0,
          violence: 0,
          wits: 0,
          willpower: 0,
          hp: 0,
          sp: 0,
          profession: config.profession.pick(),
          reputation: config.reputation.pick(),
          gear: config.gear.pickTwo(),
          arms: config.arms.pick(),
          gender: config.gender,
          name: result[0],
          imageUrl: result[1],
        };
      }).then(calculatePoints);
    };

  return {
    generate,
  };
};

export {
  IRatsPCConfig,
  IRatsPCFactory,
  TRatsPC,
  RatsPC,
};
