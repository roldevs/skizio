import R from 'ramda';
import { randomFromArray } from '../../common/utils';
import { ILoaderFactory } from './loader';

interface IArm {
  name: string;
  damage: string;
  cost: number;
  except?: string[];
}

interface IArmor {
  name: string;
  defence: number;
  cost: number;
  except?: string[];
}

interface IGearConfig {
  loader: ILoaderFactory;
}

interface IGearFactory {
  validArms: (cls: string) => IArm[];
  validArmors: (cls: string) => IArmor[];
  buyArms: (cls: string, money: number) => IArm[];
  buyArmors: (cls: string, money: number) => IArmor[];
}

type TGear = (config: IGearConfig) => IGearFactory;

const Gear: TGear = (config) => {
  const strengthArms: IArm[] = config.loader.getStrengthArms();
  const dexeretyArms: IArm[] = config.loader.getDexeretyArms();
  const armors: IArmor[] = config.loader.getArmors();

  const getExceptData: (item: IArm | IArmor) => string[] =
    (item) => R.defaultTo([], R.view(R.lensProp('except'), item));

  const hasExceptClass: (cls: string) => (item: IArm | IArmor) => boolean =
    (cls) => R.compose(R.includes(cls), getExceptData);

  const getStrengthArms: (cls: string) => IArm[] =
    (cls) => R.reject(hasExceptClass(cls), strengthArms);

  const getDexerityArms: (cls: string) => IArm[] =
    (cls) => R.reject(hasExceptClass(cls), dexeretyArms);

  const validArms: (cls: string) => IArm[] =
    (cls) => getDexerityArms(cls).concat(getStrengthArms(cls));

  const validArmors: (cls: string) => IArmor[] =
    (cls) => R.reject(hasExceptClass(cls), armors);

  const pickRandomArm: (cls: string) => IArm =
    R.compose(randomFromArray, validArms);

  const pickRandomArmor: (cls: string) => IArmor =
    R.compose(randomFromArray, validArmors);

  const alreadyHaveArm: (arm: IArm, arms: IArm[]) => boolean = R.includes;

  const repeatCount: () => number =
    () => 3 * (strengthArms.length + dexeretyArms.length + armors.length);

  const pickRandomArmWithMoney: (cls: string, money: number, arms: IArm[]) => IArm | null =
    (cls, money, arms) => {
      let arm: IArm;
      let count: number = repeatCount();
      do {
        if (--count === 0) {
          return null;
        }
        arm = pickRandomArm(cls);
      } while ( alreadyHaveArm(arm, arms) || (arm && arm.cost > money) );
      return arm;
    };

  const pickRandomArmorWithMoney: (cls: string, money: number) => IArmor | null =
    (cls, money) => {
      let armor: IArmor;
      let count: number = repeatCount();
      do {
        if (--count === 0) {
          return null;
        }
        armor = pickRandomArmor(cls);
      } while ( armor && armor.cost > money );
      return armor;
    };

  const buyArms: (cls: string, money: number) => IArm[] =
    (cls, money) => {
      const firstArm: IArm | null  = pickRandomArmWithMoney(cls, money, []);
      if (!firstArm) {
        return [];
      }
      const secondArm: IArm | null = pickRandomArmWithMoney(cls, money - firstArm.cost, [firstArm]);
      if (!secondArm) {
        return [firstArm];
      }
      return [firstArm, secondArm];
    };

  const buyArmors: (cls: string, money: number) => IArmor[] =
    (cls, money) => {
      const armor: IArmor | null = pickRandomArmorWithMoney(cls, money);
      return armor ? [armor] : [];
    };

  return {
    validArms,
    validArmors,
    buyArms,
    buyArmors,
  };
};

export {
  IArm,
  IArmor,
  IGearConfig,
  IGearFactory,
  TGear,
  Gear,
};
