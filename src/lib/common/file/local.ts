import Bluebird from 'bluebird';
import { execSync } from 'child_process';
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

  const fileSize: (path: string) => number =
    (path) => parseInt(execSync(`sed -n '$=' ${addRoot(path)}`).toString().trim(), 10);

  const pickLine: (path: string, pos: number) => Bluebird<string> =
    (path, pos) => {
      return new Bluebird((resolve, reject) => {
        const stream = fs.createReadStream(addRoot(path), {
          flags: 'r',
          encoding: 'utf-8',
        });
        let fileData = '';
        stream.on('data', (data) => {
          fileData += data;
          const lines = fileData.split('\n');
          if (lines.length >= +pos) {
            stream.destroy();
            resolve(lines[+pos]);
          } else {
            fileData = Array(lines.length).join('\n');
          }
        });
        stream.on('error', reject);
        stream.on('end', () => reject('File end reached without finding line'));
      });
    };

  return {
    addRoot,
    listDir,
    loadYAML,
    fileSize,
    pickLine,
  };
};

export {
  FileLocal,
};
