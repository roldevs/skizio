import * as hasher from 'hasher';
import * as R from 'ramda';
import * as scaleApp from 'scaleapp';

const setHashWithoutNavigate: (path: string) => any = function(path) {
  hasher.changed.active = false; // disable changed signal
  hasher.setHash(path); // set hash without dispatching changed signal
  hasher.changed.active = true; // re-enable signa
};

const hashMapFn: () => any = R.always({
  appendHash: hasher.appendHash,
  changed: hasher.changed,
  initialized: hasher.initialized,
  prependHash: hasher.prependHash,
  separator: hasher.separator,
  stopped: hasher.stopped,
  dispose: hasher.dispose,
  getBaseURL: hasher.getBaseURL,
  getHash: hasher.getHash,
  getHashArray: hasher.getHashAsArray,
  getURL: hasher.getURL,
  init: hasher.init,
  isActive: hasher.isActive,
  replaceHash: hasher.replaceHash,
  setHash: hasher.setHash,
  setHashWithoutNavigate,
  stop: hasher.stop,
  toString: hasher.toString,
});

const pluginFn: scaleApp.IPluginInitFn = function(core: any) {
  // Extender el core
  core.hasher = hashMapFn();

  // Extender el sandbox
  core.Sandbox.prototype.hasher = hashMapFn();

  return {
    init: () => { /* Empty method placeholder */ },
    destroy: () => { /* Empty method placeholder */ },
  };
};

export default pluginFn;
