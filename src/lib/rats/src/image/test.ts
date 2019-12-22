import Bluebird from 'bluebird';
import { IImageFactory } from '../../typings/image';
import { EGender } from '../../typings/pc';

const TestImages: () => IImageFactory =
  () => {
    const pick: (gender: EGender) => Promise<string> =
      () => Promise.resolve('https://randomuser.me/api/portraits/women/66.jpg');
    return {
      pick,
    };
  };

export {
  TestImages,
};
