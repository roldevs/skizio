import * as hasher from 'hasher';
import * as R from 'ramda';
import * as scaleApp from 'scaleapp';
import servicesInit from '../../services/init';

const pluginFn: scaleApp.IPluginInitFn = (core: any) => {
  // Inicializar los servicios
  const services = servicesInit({core});

  // Extender el core
  core.services = services;

  // Extender el sandbox
  core.Sandbox.prototype.services = services;

  return {
    init: () => { /* Empty method placeholder */ },
    destroy: () => { /* Empty method placeholder */ },
  };
};

export default pluginFn;
