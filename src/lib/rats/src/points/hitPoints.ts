import { IRatsPC } from '../../typings/pc';
import { BasePoints } from './basePoints';

interface IHitPointsFactory {
  calculate: (pc: IRatsPC) => IRatsPC;
}

const HitPoints: () => IHitPointsFactory = BasePoints('brawn', 'hp', 10);

export {
  IHitPointsFactory,
  HitPoints,
};
