import axios from 'axios';
import Bluebird = require('bluebird');

type IVEPCServiceResult = string[];

interface IServiceResult<T> {
  succes: boolean;
  data: T;
}

interface IVEPCServicesFactory {
  races: (locale: string, system: string) => Promise<IServiceResult<IVEPCServiceResult>>;
  classes: (locale: string, system: string) => Promise<IServiceResult<IVEPCServiceResult>>;
}

const veServices: () => IVEPCServicesFactory =
  () => {
    const races: (locale: string, system: string) => Promise<IServiceResult<IVEPCServiceResult>> =
      (locale, system) => axios.get(`/api/ve/pc/${locale}/${system}/races.json`);

    const classes: (locale: string, system: string) => Promise<IServiceResult<IVEPCServiceResult>> =
      (locale, system) => axios.get(`/api/ve/pc/${locale}/${system}/classes.json`);

    return {
      races,
      classes,
    };
  };

export {
  IServiceResult,
  IVEPCServiceResult,
  IVEPCServicesFactory,
  veServices,
};
