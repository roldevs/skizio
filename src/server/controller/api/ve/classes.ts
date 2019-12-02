import Bluebird from 'bluebird';
import { IVEEnvClassInfo, VEEnv } from '../../../../lib/ve-pc/env';
import { FileLocal } from '../../../../lib/ve-pc/src/file/local';
import { IFileFactory } from '../../../../lib/ve-pc/typings/file';
import trackEvent from '../../../track';

// Params: locale, leel, race, class
const vePcRacesRequest: (req: any, res: any) => Bluebird<IVEEnvClassInfo[]> =
(req) => {
  const url = `/api/ve/pc/${req.params.locale}/${req.params.system}/classes.json`;
  return trackEvent(url, 'VE Races').then(() => {
    const file: IFileFactory = FileLocal({
      root: './src/lib/ve-pc/',
    });

    return VEEnv({
      system: req.params.system,
      file,
    }).getClasses(req.params.locale);
  });
};

export default vePcRacesRequest;
