import R from 'ramda';
import { randomFromArray } from '../../common/utils';
import { IRatsPC } from '../typings/pc';

interface IAttributesFactory {
  fill: (points: number) => (pc: IRatsPC) => IRatsPC;
}

const Attributes: () => IAttributesFactory =
  () => {
    const attributes: string[] = [
      'brawn',
      'dexterity',
      'violence',
      'wits',
      'willpower',
    ];

    const attributeValue: (attr: string) => (pc: IRatsPC) => number =
      (attr) => R.view(R.lensProp(attr));

    const attributeAvaliable: (pc: IRatsPC) => (attr: string) => boolean =
      (pc) => (attr) => attributeValue(attr)(pc) < 3;

    // Get any attribute with less than 3 points assigned
    const attrAvailable: (pc: IRatsPC) => string[] =
      (pc) => R.filter(attributeAvaliable(pc), attributes);

    const attrTransformation: (pc: IRatsPC) => any =
      (pc) => {
        const transformations: any = {};
        const attribute: string = randomFromArray(attrAvailable(pc));
        transformations[attribute] = R.inc;
        return transformations;
      };

    const incrAttribute: (pc: IRatsPC) => IRatsPC =
      (pc) => R.evolve(attrTransformation(pc), pc as any) as IRatsPC;

    const fill: (points: number) => (pc: IRatsPC) => IRatsPC =
      () => (pc) => {
        R.times(() => pc = incrAttribute(pc), 5);
        return pc;
      };

    return {
      fill,
    };
  };

export {
  IAttributesFactory,
  Attributes,
};
