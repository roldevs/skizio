import R from 'ramda';
import { IRatsPC } from '../../typings/pc';

interface IBasePointsFactory {
  calculate: (pc: IRatsPC) => IRatsPC;
}

const BasePoints: (attribute: string, baseAttribute: string, basePoints: number) => () => IBasePointsFactory =
  (attribute, baseAttribute, basePoints) => () => {
    const getValue: (pc: IRatsPC) => number =
      R.prop(attribute) as (pc: IRatsPC) => number;

    const totalValue: (pc: IRatsPC) => number = R.compose(R.add(basePoints), getValue);

    const calculate: (pc: IRatsPC) => IRatsPC =
      (pc) => R.set(R.lensProp(baseAttribute), totalValue(pc), pc);

    return {
      calculate,
    };
  };

export {
  IBasePointsFactory,
  BasePoints,
};
