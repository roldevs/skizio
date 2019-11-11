import snabbdomPatch from '../../../snabbdom_renderer';
import viewFn from './view';

const layoutModule = (sb: any) => {
  let vdom: any;

  const onModuleInit = (config: any, done: () => void) => {
    vdom = document.getElementById(config.el);
    vdom = snabbdomPatch(vdom, viewFn(sb.locale.get()));
    done();
  };

  const onModuleDestroy = (done: () => void) =>  done();

  return {
    init: onModuleInit,
    destroy: onModuleDestroy,
  };
};

export default layoutModule;
