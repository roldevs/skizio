import flyd from 'flyd';
import snabbdomPatch from '../../../../snabbdom_renderer';
import { IVEFormModelFactory, VEFormModel } from './model';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;
  const view: IVEFormModelFactory = VEFormModel();
  const subscriptions = {};

  const onModuleInit = (config: any, done: () => void) => {
    view.init({
      locale: sb.locale.get(),
      system: 've.jdr',
      class: null,
      race: null,
      level: 0,
      createBtnEnabled: false,
      threeBonus: 'twoBonus',
      url: '',
    });
    vdom = document.getElementById(config.el);
    flyd.on(render, view.stream$);
    render();
    done();
  };

  const onModuleDestroy = (done: () => void) => {
    sb.scaleApp.cleanSubscriptions(subscriptions);
    done();
  };

  const render: () => void = () => {
    vdom = snabbdomPatch(vdom, viewFn(view));
  };

  return { init: onModuleInit, destroy: onModuleDestroy };
};

export default layoutModule;
