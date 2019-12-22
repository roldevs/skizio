// tslint:disable:no-console
import crossroads from 'crossroads';
import * as hasher from 'hasher';
import * as R from 'ramda';
import homePage from './pages/home';
import ratsPage from './pages/rats';
import vePage from './pages/ve';

const bypassed: (request: any) => void =
(request) => {
    console.group('crossroads: bypassed');
    // tslint:disable-next-line:no-console
    console.log(request);
    console.groupEnd();
};

// setup hasher
const parseHash = function(newHash: string, oldHash: string) {
  if (newHash !== oldHash) {
    crossroads.parse(newHash);
  }
};

const initHasher = function() {
  hasher.initialized.add(parseHash); // parse initial hash
  hasher.changed.add(parseHash); // parse hash changes
  hasher.init(); // start listening for history change
};

const addRoute: (pattern: any, handler: any) => any =
(pattern, handler) => {
  crossroads.addRoute(pattern, handler);
};

const emptyOptions: (options: any) => boolean = R.compose(R.isEmpty, R.defaultTo([]));

const setLocale: (core: any, page: any) => (options: string[]) => any =
  (core, page) => (options) => {
    if (emptyOptions(options)) {
      core.locale.set('es');
      return hasher.setHash(`es/home`);
    }
    core.locale.set(options);
    return page(options);
  };

const homePageRoute: (core: any) => any =
  (core) => setLocale(core, homePage({ core }).page);

const initRouter: (config: {
  core: any,
}) => any =
(config) => {
  // Set if crossroads should typecast route paths
  crossroads.shouldTypecast = true;
  crossroads.bypassed.add(bypassed);

  const init: () => any =
  () => {
    addRoute('/:locale:/ve', setLocale(config.core, vePage({core: config.core}).page));
    addRoute('/:locale:/rats', setLocale(config.core, ratsPage({core: config.core}).page));
    addRoute('/:locale:/home', homePageRoute(config.core));
    addRoute('/', homePageRoute(config.core));
    initHasher();
  };

  return {
    init,
  };
};

export default initRouter;
