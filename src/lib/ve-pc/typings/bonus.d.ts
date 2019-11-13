import { IHash } from "./common";

interface IBonusConfig {
  attributes: IHash;
}

interface IBonusFactory {
  get: () => IHash;
}

type TBonus = (config: IBonusConfig) => IBonusFactory;

export {
  IBonusConfig,
  IBonusFactory,
  TBonus,
};
