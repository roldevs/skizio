import flyd from 'flyd';
import { EGender } from '../../../../../lib/rats/typings/pc';
import snabbdomPatch from '../../../../snabbdom_renderer';
import { IRatsFormModelFactory, RatsFormModel } from './model';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;
  const view: IRatsFormModelFactory = RatsFormModel(sb);
  const subscriptions = {};

  const onModuleInit = (config: any, done: () => void) => {
    view.init({
      loading: false,
      gender: EGender.male,
      url: '',
      locale: sb.locale.get(),
      createBtnEnabled: false,
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
