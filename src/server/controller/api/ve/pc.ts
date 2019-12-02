import Bluebird from 'bluebird';
import R from 'ramda';
import { VEPC } from '../../../../lib/ve-pc/pc';
import trackEvent from '../../../track';

// Params: locale, leel, race, class, threeBonus
const vePcSheetRequest: (req: any, res: any) => Bluebird<any> =
(req) => {
  const url = `/api/ve/pc/${req.params.locale}/${req.params.system}/${req.params.level}/${req.params.race}/${req.params.class}/sheet.png`;
  const threeBonus: boolean = req.query.threeBonus === 'true';
  const level: number = R.defaultTo(1, parseInt(req.query.level, 10));
  return trackEvent(url, 'VE PC').then(() => {
    return VEPC({
      class: req.params.class,
      locale: req.params.locale,
      race: req.params.race,
      root: './src/lib/ve-pc/',
      system: req.params.system,
      threeBonus,
      level,
    }).fillCanvas().then((canvas) => {
      return canvas.createPNGStream();
    });
  });
};

export default vePcSheetRequest;
