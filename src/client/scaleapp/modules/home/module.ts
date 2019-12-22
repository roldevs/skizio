import flyd from 'flyd';
import snabbdomPatch from '../../../snabbdom_renderer';
import { HomeModel, IHomeModelFactory } from './model';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;
  const view: IHomeModelFactory = HomeModel(sb);
  const subscriptions = {};

  const onModuleInit = (config: any, done: () => void) => {
    view.init({
      locale: sb.locale.get(),
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
