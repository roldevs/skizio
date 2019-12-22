import Bluebird from 'bluebird';
import { FileLocal } from '../../../../lib/common/file/local';
import { IFileFactory } from '../../../../lib/common/typings/file';
import { IVEEnvRaceInfo, VEEnv } from '../../../../lib/ve-pc/env';
import trackEvent from '../../../track';

// Params: locale, leel, race, class
const vePcRacesRequest: (req: any, res: any) => Bluebird<IVEEnvRaceInfo[]> =
(req) => {
  const url = `/api/ve/pc/${req.params.locale}/${req.params.system}/races.json`;
  return trackEvent(url, 'VE Races').then(() => {
    const file: IFileFactory = FileLocal({
      root: './src/lib/ve-pc/',
    });

    return VEEnv({
      system: req.params.system,
      file,
    }).getRaces(req.params.locale);
  });
};

export default vePcRacesRequest;
