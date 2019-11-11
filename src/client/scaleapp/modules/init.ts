import layoutModule from './layout/module';
import veFormModule from './ve/form/module';

export default (core: any) => {
  core.register('layout', layoutModule);
  core.register('ve.form', veFormModule);
};
