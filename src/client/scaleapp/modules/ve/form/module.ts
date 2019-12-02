import flyd from 'flyd';
import snabbdomPatch from '../../../../snabbdom_renderer';
import { IVEFormModelFactory, VEFormModel } from './model';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;
  const view: IVEFormModelFactory = VEFormModel(sb);
  const subscriptions = {};

  const onModuleInit = (config: any, done: () => void) => {
    view.init({
      loading: false,
      locale: sb.locale.get(),
      system: 've.jdr',
      races: [],
      classes: [],
      class: null,
      race: null,
      level: 1,
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
