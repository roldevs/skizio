import Bluebird from 'bluebird';
import { VEPC } from '../../../../lib/ve-pc/index';
import trackEvent from '../../../track';

// Params: locale, leel, race, class
const vePcSheetRequest: (req: any, res: any) => Bluebird<any> =
(req) => {
  const url = `/api/ve/pc/${req.params.locale}/${req.params.system}/${req.params.level}/${req.params.race}/${req.params.class}/sheet.png`;
  const threeBonus: boolean = req.query.threeBonus === 'true';
  return trackEvent(url, 'VE PC').then(() => {
    return VEPC({
      class: req.params.class,
      locale: req.params.locale,
      race: req.params.race,
      root: './src/lib/ve-pc/',
      system: req.params.system,
      threeBonus,
    }).fillCanvas().then((canvas) => {
      return canvas.createPNGStream();
    });
  });
};

export default vePcSheetRequest;
