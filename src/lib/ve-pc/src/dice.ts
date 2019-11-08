import R from 'ramda';

interface IDiceFactory {
  roll: () => number[];
}

type TDice = (sides: number, dices: number) => IDiceFactory;

const Dice: TDice = (sides, dices) => {
  const randomNumber: () => number = () => Math.floor(Math.random() * sides) + 1;
  const roll: () => number[] = () => R.times(randomNumber, dices);

  return {
    roll,
  };
};

export {
  IDiceFactory,
  TDice,
  Dice,
};
