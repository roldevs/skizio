import axios from 'axios';
import Bluebird = require('bluebird');
import R from 'ramda';
import { INameFactory } from '../../typings/name';
import { EGender } from '../../typings/pc';

interface IUINamesConfig {
  region: string;
}

const UINames: (config: IUINamesConfig) => INameFactory =
  (config) => {
    const nameUrl: (gender: EGender) => string =
      (gender) => `https://uinames.com/api/?gender=${gender}&amount=1&region=${config.region}`;

    const request: (gender: EGender) => Promise<any> =
      (gender) => axios.get(nameUrl(gender));

    const getName: (value: any) => string = R.view(R.lensPath(['data', 'name']));
    const getSurname: (value: any) => string = R.view(R.lensPath(['data', 'surname']));

    const getFullName: (value: any) => string =
      (value) => `${getName(value)} ${getSurname(value)}`;

    const pick: (gender: EGender) => Promise<string> =
      (gender) => request(gender).then(getFullName);

    return {
      pick,
    };
  };

export {
  UINames,
};
