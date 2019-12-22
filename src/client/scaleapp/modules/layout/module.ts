import flyd from 'flyd';
import snabbdomPatch from '../../../snabbdom_renderer';
import { ILayoutModelFactory, LayoutModel } from './model';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;
  const view: ILayoutModelFactory = LayoutModel(sb);

  const onModuleInit = (config: any, done: () => void) => {
    view.init({
      locale: sb.locale.get(),
    });

    vdom = document.getElementById(config.el);
    flyd.on(render, view.stream$);
    render();
    done();
  };

  const render: () => void = () => {
    vdom = snabbdomPatch(vdom, viewFn(view));
  };

  const onModuleDestroy = (done: () => void) =>  done();

  return {
    init: onModuleInit,
    destroy: onModuleDestroy,
  };
};

export default layoutModule;
