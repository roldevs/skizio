import { IRatsPC } from '../../typings/pc';
import { BasePoints } from './basePoints';

interface ISanityPointsFactory {
  calculate: (pc: IRatsPC) => IRatsPC;
}

const SanityPoints: () => ISanityPointsFactory = BasePoints('willpower', 'sp', 10);

export {
  ISanityPointsFactory,
  SanityPoints,
};
