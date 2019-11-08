import * as R from 'ramda';
import vePC from './ve/pc';

const indexRandomApiController = () => {
  const sheet = (req: any, res: any) => {
    return vePC(req, res).then((data) => {
      res.setHeader('Content-Type', 'image/png');
      data.pipe(res);
    });
  };

  return {
    sheet,
  };
};

export default indexRandomApiController;
