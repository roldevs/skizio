import { EGender } from './pc';

interface IImageFactory {
  pick: (gender: EGender) => Promise<string>;
}

export {
  IImageFactory,
};
