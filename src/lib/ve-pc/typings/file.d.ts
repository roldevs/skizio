import Bluebird from 'bluebird';

interface IFileConfig {
  root: string;
}
interface IFileFactory {
  addRoot: (dir: string) => string;
  listDir: (path: string) => Bluebird<string[]>;
  loadYAML: (path: string) => any;
}

type TFileLocal = (config: IFileConfig) => IFileFactory;

export {
  IFileConfig,
  IFileFactory,
  TFileLocal,
};
