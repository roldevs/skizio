import homeModule from './home/module';
import layoutModule from './layout/module';
import ratsFormModule from './rats/form/module';
import veFormModule from './ve/form/module';

export default (core: any) => {
  core.register('layout', layoutModule);
  core.register('home', homeModule);
  core.register('ve.form', veFormModule);
  core.register('rats.form', ratsFormModule);
};
