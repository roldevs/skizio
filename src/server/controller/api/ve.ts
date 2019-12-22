import { IVEEnvClassInfo, IVEEnvRaceInfo } from '../../../lib/ve-pc/env';
import vePcClassesRequest from './ve/classes';
import vePC from './ve/pc';
import vePcRacesRequest from './ve/races';

const veApiController = () => {
  const sheet = (req: any, res: any) => {
    return vePC(req, res).then((data) => {
      res.setHeader('Content-Type', 'image/png');
      data.pipe(res);
    });
  };

  const races = (req: any, res: any) => {
    return vePcRacesRequest(req, res).then((data: IVEEnvRaceInfo[]) => {
      res.json({
        success: true,
        data,
      });
    });
  };

  const classes = (req: any, res: any) => {
    return vePcClassesRequest(req, res).then((data: IVEEnvClassInfo[]) => {
      res.json({
        success: true,
        data,
      });
    });
  };

  return {
    sheet,
    races,
    classes,
  };
};

export default veApiController;
