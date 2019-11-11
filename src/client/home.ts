
import * as scaleApp from 'scaleapp';

import initRouter from './router/init';
import initModules from './scaleapp/modules/init';
import initPlugins from './scaleapp/plugins/init';

type IApplication= (config: { el: string, locale: string}) => {
  init: () => void;
};

const app: IApplication =
(_) => {
  // let vdom: any = document.getElementById(opts.el);
  // vdom = SnabbdomPatch(vdom, view);

  const init: () => void = () => {
    // Establecer locale de la aplicacion
    // I18n.locale = app_config.locale; // app_config.locale;
    // moment.locale(app_config.locale);

    // Enviar al log los errores de ScaleApp
    scaleApp.Core.prototype.log = console;

    const core: any = new scaleApp.Core();

    // Inicializar plugins de scaleApp
    initPlugins(core);
    initModules(core);

    // Inicializar el core
    core.boot();

    // Inicializar el enrutador
    const router = initRouter({core});
    router.init();

    // core.scaleApp.moduleStart('pusher', {
    //   options: {
    //     el: 'pusher',
    //   },
    // }).then(function() {
    //   core.scaleApp.moduleStart('message', {
    //     options: {
    //       el: 'message_pane',
    //     },
    //   });
    // });
  };

  return {
    init,
  };
};

export default app;
