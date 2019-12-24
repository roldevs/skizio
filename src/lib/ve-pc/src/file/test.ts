import Bluebird from 'bluebird';
import { IFileFactory } from '../../../common/typings/file';
import { IClassDef } from '../../typings/class';
import { IRaceDef } from '../../typings/race';

interface IFileTestDefinition {
  races?: string[];
  classes?: string[];
  raceDef?: IRaceDef;
  classDef?: IClassDef;
}

type TFileTest = (definition: IFileTestDefinition) => IFileFactory;

const FileTest: TFileTest = (definition) => {
  const listDir: (path: string) => Bluebird<string[]> =
    (path) => {
      if (path.includes('races')) {
        return Bluebird.resolve(definition.races!);
      }
      if (path.includes('classes')) {
        return Bluebird.resolve(definition.classes!);
      }
      return Bluebird.resolve([]);
    };

  const loadYAML: (path: string) => any = (path) => {
    if (path.includes('races')) {
      return definition.raceDef;
    }
    if (path.includes('classes')) {
      return definition.classDef;
    }
    return null;
  };

  return {
    addRoot: () => '',
    listDir,
    loadYAML,
    fileSize: () => 0,
    pickLine: () => Bluebird.resolve(''),
  };
};

export {
  IFileTestDefinition,
  TFileTest,
  FileTest,
};
