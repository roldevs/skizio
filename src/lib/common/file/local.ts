import Bluebird from 'bluebird';
import fs from 'fs';
import YAML from 'yaml';
import { TFileLocal } from '../typings/file';

const FileLocal: TFileLocal = (config) => {
  const addRoot: (path: string) => string = (path) => `${config.root}${path}`;

  const listDir: (dir: string) => Bluebird<string[]> =
    (dir) => {
      return new Bluebird((resolve, reject) => {
        fs.readdir(addRoot(dir), (err, files) => {
          if (err) {
            reject(err);
          }
          resolve(files);
        });
      });
    };

  const loadYAML: (path: string) => any =
    (path) => YAML.parse(fs.readFileSync(addRoot(path), 'utf8'));

  return {
    addRoot,
    listDir,
    loadYAML,
  };
};

export {
  FileLocal,
};
