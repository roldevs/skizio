import { randomFromArray } from '../../common/utils';

interface IGearFactory {
  pickTwo: () => string[];
}

type TGear = (gear: string[]) => IGearFactory;

const Gear: TGear = (gear: string[]) => {
  const pick: () => string[] =
    () => [
      randomFromArray(gear),
      randomFromArray(gear),
    ];

  const areEqual: (gears: string[]) => boolean =
    (gears) => gears[0] === gears[1];

  const pickTwo: () => string[] =
    () => {
      let g: string[] = pick();
      while (areEqual(g)) {
        g = pick();
      }
      return g;
    };

  return {
    pickTwo,
  };
};

export {
  IGearFactory,
  TGear,
  Gear,
};
