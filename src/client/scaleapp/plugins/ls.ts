import * as R from 'ramda';
import * as scaleApp from 'scaleapp';

const ls = (core: any) => {
  let id: any;
  let m: any;
  let results: any;
  results = [];
  for (id in core) {
    if (core.hasOwnProperty(id)) {
      m = core[id];
      results.push(id);
    }
  }
  return results;
};

const lsPlugins = (core: any) => {
  return R.reject((ref: any) => {
    return R.isNil(ref.plugin != null ? ref.plugin.id : void 0);
  }, core._plugins);
};

const pluginFn: scaleApp.IPluginInitFn = (core: any) => {
  core.lsInstances = () => ls(core._instances);
  core.lsModules = () => ls(core._modules);
  core.lsPlugins = () => lsPlugins(core);

  return {
    init: () => { /* Empty method placeholder */ },
    destroy: () => { /* Empty method placeholder */ },
  };
};

export default pluginFn;
