import * as hasher from 'hasher';
import * as R from 'ramda';
import * as scaleApp from 'scaleapp';

const pluginFn: scaleApp.IPluginInitFn = (core: any) => {
  let locale: string = 'es';

  const set: (l: string) => void =
    (l) => {
      locale = l;
    };

  const get: () => string = () => locale;

  // Extender el core
  core.locale = {
    set,
    get,
  };

  // Extender el sandbox
  core.Sandbox.prototype.locale = {
    set,
    get,
  };

  return {
    init: () => { /* Empty method placeholder */ },
    destroy: () => { /* Empty method placeholder */ },
  };
};

export default pluginFn;
