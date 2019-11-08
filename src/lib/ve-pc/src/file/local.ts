import fs from 'fs';
import YAML from 'yaml';
import { IFileFactory } from '../../typings/file';

type TFileLocal = () => IFileFactory;

const FileLocal: TFileLocal = () => {
  const listDir: (path: string) => string[] =
    (path) => fs.readdirSync(path);

  const loadYAML: (path: string) => any =
    (path) => YAML.parse(fs.readFileSync(path, 'utf8'));

  return {
    listDir,
    loadYAML,
  };
};

export {
  FileLocal,
};
