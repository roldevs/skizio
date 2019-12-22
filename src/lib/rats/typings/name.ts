import { EGender } from './pc';

interface INameFactory {
  pick: (gender: EGender) => Promise<string>;
}

export {
  INameFactory,
};
