import axios from 'axios';
import Bluebird from 'bluebird';
import R from 'ramda';
import { IImageFactory } from '../../typings/image';
import { EGender } from '../../typings/pc';

interface IGeneratedPhotosConfig {
  key: string;
  imgIndex: number;
}

// https://generated.photos/account#apikey
const GeneratedPhotos: (options: IGeneratedPhotosConfig) => IImageFactory =
  (options) => {
    const randPage: () => number = () => Math.floor(Math.random() * 10000);

    const imageUrl: (gender: EGender) => string =
      (gender) => `https://api.generated.photos/api/v1/faces?per_page=1&page=${randPage()}&gender=${gender}`;

    const requestOpts: any = { headers: { Authorization: `API-Key ${options.key}` } };

    const request: (gender: EGender) => Bluebird<any> =
      (gender) => {
        return new Bluebird((resolve, reject) => {
          axios.get(imageUrl(gender), requestOpts).then(resolve).catch(reject);
        });
      };

    const getFaces: (data: any) => any = R.view(R.lensPath(['data', 'faces']));
    const getFirstFace: (data: any) => any = R.compose(R.head, getFaces);
    const getUrlsFirstFace: (data: any) => any = R.compose(R.prop('urls'), getFirstFace);
    const getKeyUrlData: (data: any) => any = R.compose(R.nth(options.imgIndex), getUrlsFirstFace);

    const getKeyUrls: (data: any) => any = R.compose(R.view(R.lensProp('urls')), R.nth(0), getFaces);
    const getUrl: (data: any) => string = R.compose(R.head, R.values, getKeyUrlData);

    const pick: (gender: EGender) => Bluebird<string> = (gender) => request(gender).then(getUrl);
    return {
      pick,
    };
  };

export {
  IGeneratedPhotosConfig,
  GeneratedPhotos,
};
