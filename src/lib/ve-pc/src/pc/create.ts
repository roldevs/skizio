import R from 'ramda';
import { IClassProgressItem } from '../../typings/class';
import { IHash } from '../../typings/common';
import { IPC } from '../../typings/pc';
import { Bonus } from '../bonus';
import { IClassFactory } from '../class';
import { Dice, TDice } from '../dice';
import { IArm, IArmor, IGearFactory } from '../gear';
import { HitPoints } from '../hit_points';
import { Items } from '../items';
import { Progress } from '../progress';
import { IRaceFactory } from '../race';
import { randomFromArray } from '../utils';

interface IPCCreateConfig {
  startHabilityPoints: number;
  race: IRaceFactory;
  class: IClassFactory;
  dice: TDice;
  backgrounds: string[];
  gear: IGearFactory;
}

interface IPCCreateFactory {
  generate: () => IPC;
}

const PCCreate: (config: IPCCreateConfig) => IPCCreateFactory =
  (config) => {
    const forEachIndexed = R.addIndex<string>(R.forEach);
    const roll3d6: (reroll: number) => number[] = (reroll) => {
      const diff: (a: number, b: number ) => number = (a, b) => b - a;
      const values: number[][] = R.times(Dice(6, 3).roll, reroll);
      return R.compose(R.sort(diff), R.map(R.sum))(values);
    };

    const attributeKeys: () => string[] =
      () => R.map(R.prop('key'), Items({
          itemsA: config.race.getAttributes(),
          itemsB: config.class.getAttributes(),
        }).combinedSorted);

    const habilitiesKeys: () => string[] =
      () => R.map(R.prop('key'), Items({
          itemsA: config.race.getHabilites(),
          itemsB: config.class.getHabilites(),
        }).combinedSorted);

    const generateAttributes: () => IHash =
      () => {
        const keys: string[] = attributeKeys();
        const dices: number[] = roll3d6(keys.length);
        const attributes: IHash = {};
        const setAtribute: (item: string, idx: number) => void =
          (item, idx) => attributes[item] = dices[idx];
        forEachIndexed(setAtribute, keys);
        return attributes;
      };

    const generateBonus: (attributes: IHash) => IHash =
      (attributes) => Bonus({ attributes }).get();

    const generateHabilites: () => IHash =
      () => {
        const keys: string[] = habilitiesKeys();
        const habilities: IHash = {};
        const setHability: (item: string, idx: number) => void =
          (item, idx) => habilities[item] = (idx < config.startHabilityPoints ? 1 : 0);
        forEachIndexed(setHability, keys);
        return habilities;
      };

    const combineTalents: () => string[] = () =>  R.uniq(R.concat(
      config.race.getTalents(),
      config.class.getTalents(),
    ));

    const getProgress: (level: number) => IClassProgressItem | undefined =
      (level) => Progress({ class: config.class }).get(level);

    const getHitPoints: (level: number, constitution: number) => number =
      HitPoints({ class: config.class, dice: config.dice }).get;

    const getBackground: () => string = () => randomFromArray(config.backgrounds);

    const getArms: (money: number) => IArm[] =
      (money) => config.gear.buyArms(config.class.getName(), money);

    const getArmors: (money: number) => IArmor[] =
      (money) => config.gear.buyArmors(config.class.getName(), money);

    const gearCost: (gear: IArm[] | IArmor[]) => number = R.compose(R.sum, R.map(R.prop('cost')));

    const getMoney: () => number = R.compose(R.sum, config.dice(6, 10).roll);

    const getDefence: (attrBonus: IHash, armors: IArmor[]) => string =
      (attrBonus, armors) => {
        const dexerety: number = R.defaultTo(0, attrBonus.dexerety);
        const defence: number = R.compose(R.sum, R.map(R.prop('defence')))(armors);
        return `${10 + dexerety} + ${defence}`;
      };

    const generate: () => IPC = () => {
      const level: number = 1;
      const attributes: IHash = generateAttributes();
      const attrBonus: IHash = generateBonus(attributes);
      const habilities: IHash = generateHabilites();
      const progress: IClassProgressItem | undefined = getProgress(level);
      const hitPoints: number = getHitPoints(level, attrBonus.constitution);
      const money: number = getMoney();
      const arms: IArm[] = getArms(money);
      const armors: IArmor[] = getArmors(money - gearCost(arms));
      const magicPower: number = (progress ? progress.mp : 0) + attrBonus.inteligence;
      return {
        race: config.race.getName(),
        class: config.class.getName(),
        level,
        movement: config.race.getMovement(),
        attributes,
        attr_bonus: attrBonus,
        habilities,
        talents: combineTalents(),
        atk: progress ? progress.atk : null,
        mp: magicPower,
        ins: progress ? progress.ins : null,
        pv: hitPoints,
        def: getDefence(attrBonus, armors),
        background: getBackground(),
        money: money - (gearCost(arms) - gearCost(armors)),
        arms,
        armors,
      };
    };

    return {
      generate,
    };
  };

const defaultPC: IPC = {
  race: '',
  class: '',
  level: 0,
  movement: 0,
  attributes: {},
  attr_bonus: {},
  habilities: {},
  talents: [],
  atk: null,
  mp: 0,
  ins: 0,
  pv: 0,
  def: '',
  background: '',
  money: 0,
  arms: [],
  armors: [],
};

export {
  IPCCreateConfig,
  IPCCreateFactory,
  PCCreate,
  defaultPC,
};
