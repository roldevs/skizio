import ratsPcRequest from './rats/pc';

const ratsApiController = () => {
  const sheet = (req: any, res: any) => {
    return ratsPcRequest(req, res).then((data) => {
      res.setHeader('Content-Type', 'image/png');
      data.pipe(res);
    });
  };

  return {
    sheet,
  };
};

export default ratsApiController;
