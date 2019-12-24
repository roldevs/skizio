import Bluebird from 'bluebird';
import { Canvas } from 'canvas';
import { IRatsCreatorFactory, RatsCreator } from '../../../../lib/rats/creator';
import { GeneratedPhotos } from '../../../../lib/rats/src/image/generatedPhotos';
import { IImageFactory } from '../../../../lib/rats/typings/image';
import trackEvent from '../../../track';

// Params: locale
const ratsPcRequest: (req: any, res: any) => Bluebird<any> =
(req) => {
  const url = `/api/rats/${req.params.locale}/pc.json`;
  return trackEvent(url, 'Rats PC').then(() => {
    const creator: IRatsCreatorFactory = RatsCreator({
      locale: req.params.locale,
      gender: req.query.gender,
    });

    return creator.fillCanvas().then((c: Canvas) => {
      return c.createPNGStream();
    });
  });
};

export default ratsPcRequest;
