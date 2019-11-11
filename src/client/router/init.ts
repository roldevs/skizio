// tslint:disable:no-console
import crossroads from 'crossroads';
import * as hasher from 'hasher';
import * as R from 'ramda';
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
      return hasher.setHash('/ve/es');
    }
    core.locale.set(options);
    return page(options);
  };

const homePage: () => any =
  () => hasher.setHash('/ve');

const initRouter: (config: {
  core: any,
}) => any =
(config) => {
  // Set if crossroads should typecast route paths
  crossroads.shouldTypecast = true;
  crossroads.bypassed.add(bypassed);

  const init: () => any =
  () => {
    addRoute('/ve/:locale:', setLocale(config.core, vePage({core: config.core}).page));
    addRoute('/', homePage()); // Redirect to VE
    initHasher();
  };

  return {
    init,
  };
};

export default initRouter;
