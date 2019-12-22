import { FileLocal } from '../common/file/local';
import { IFileFactory } from '../common/typings/file';
import { IVEEnvFactory, VEEnv } from './env';

const file: IFileFactory = FileLocal({
  root: './',
});

const env: IVEEnvFactory = VEEnv({
  system: 've.jdr',
  file,
});
