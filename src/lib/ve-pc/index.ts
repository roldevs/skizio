import { IVEEnvFactory, VEEnv } from './env';
import { FileLocal } from './src/file/local';
import { IFileFactory } from './typings/file';

const file: IFileFactory = FileLocal({
  root: './',
});

const env: IVEEnvFactory = VEEnv({
  system: 've.jdr',
  file,
});
