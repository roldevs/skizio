import Bluebird from 'bluebird';

interface IFileConfig {
  root: string;
}
interface IFileFactory {
  addRoot: (dir: string) => string;
  listDir: (path: string) => Bluebird<string[]>;
  loadYAML: (path: string) => any;
  fileSize: (path: string) => number;
  pickLine: (path: string, pos: number) => Bluebird<string>;
}

type TFileLocal = (config: IFileConfig) => IFileFactory;

export {
  IFileConfig,
  IFileFactory,
  TFileLocal,
};
