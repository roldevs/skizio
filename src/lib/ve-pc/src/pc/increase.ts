import R from 'ramda';
import { IClassProgressItem } from '../../typings/class';
import { IHash } from '../../typings/common';
import { IPC } from '../../typings/pc';
import { IClassFactory } from '../class';
import { IHabilitiesFactory } from '../habilities';
import { IHitPointsFactory } from '../hit_points';
import { IProgressFactory } from '../progress';
import { IRaceFactory } from '../race';

interface IPCIncreaseConfig {
  race: IRaceFactory;
  class: IClassFactory;
  progress: IProgressFactory;
  hitPoints: IHitPointsFactory;
  habilities: IHabilitiesFactory;
}

interface IPCIncreaseFactory {
  increase: (pc: IPC) => IPC;
}

const PCIncrease: (config: IPCIncreaseConfig) => IPCIncreaseFactory =
  (config) => {
    const combineTalents: (level: number) => string[] = (level) =>  R.uniq(R.concat(
      config.race.getTalents(level),
      config.class.getTalents(level),
    ));

    const increaseTalents: (pc: IPC) => IPC =
      (pc) => R.set(R.lensProp('talents'), combineTalents(pc.level), pc);

    const getIncreasedProgress: (pc: IPC) => IClassProgressItem =
      (pc) => {
        const progress: IClassProgressItem = config.progress.get(pc.level + 1)!;
        const magicPower: number = (progress ? progress.mp : 0) + pc.attr_bonus.inteligence;
        return {
          atk: progress.atk,
          mp: magicPower,
          ins: progress.ins,
        };
      };

    const increaseProgress: (pc: IPC) => IPC = (pc) => R.merge(pc, getIncreasedProgress(pc));

    const increaseHitPoints: (pc: IPC) => IPC =
      (pc) => R.set(
        R.lensProp('pv'),
        config.hitPoints.incrementLevel(
          pc.level,
          pc.attr_bonus.constitution,
          pc.pv,
        ),
        pc,
      );

    const increaseHabilities: (pc: IPC) => IPC =
      (pc) => {
        // Increase habilities two times
        const habilities: IHash = R.compose(
          config.habilities.increase,
          config.habilities.increase,
        )(R.prop('habilities', pc));
        return R.set(R.lensProp('habilities'), habilities, pc);
      };

    const increaseLevel: (pc: IPC) => IPC = R.evolve({ level: R.inc });

    const increase: (pc: IPC) => IPC = R.compose(
        increaseLevel,
        increaseHabilities,
        increaseHitPoints,
        increaseProgress,
        increaseTalents,
      );

    return {
      increase,
    };
  };

export {
  IPCIncreaseConfig,
  IPCIncreaseFactory,
  PCIncrease,
};
