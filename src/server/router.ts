import express from 'express';
import RatsApiController from './controller/api/rats';
import VeApiController from './controller/api/ve';

const veRouter: () => any =
  () => {
    const router = express.Router();
    const veApiController = VeApiController();
    router.route('/pc/:locale/:system/:level/:race/:class/sheet.png').get(veApiController.sheet);
    router.route('/pc/:locale/:system/races.json').get(veApiController.races);
    router.route('/pc/:locale/:system/classes.json').get(veApiController.classes);
    return router;
  };

const ratsRouter: () => any =
  () => {
    const router = express.Router();
    const ratsApiController = RatsApiController();
    router.route('/:locale/sheet.png').get(ratsApiController.sheet);
    return router;
  };

const Router: (app: any) => void =
  (app) => {
    app.use('/api/ve/', veRouter());
    app.use('/api/rats/', ratsRouter());
  };

export default Router;
