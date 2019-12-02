import * as scaleapp from 'scaleapp';
import hasherPlugin from './hasher';
import localePlugin from './locale';
import lsPlugin from './ls';
import scaleAppPlugin from './scaleapp';
import servicesPlugin from './services';

export default (core: scaleapp.Core) => {
  // core.use(scaleApp.plugins.ls);
  core.use(lsPlugin);
  core.use(scaleAppPlugin);
  core.use(localePlugin);
  core.use(hasherPlugin);
  core.use(servicesPlugin);
};
