import R from 'ramda';
import { IClassDef } from '../../typings/class';
import { IFileFactory } from '../../typings/file';
import { IRaceDef } from '../../typings/race';

interface IFileTestDefinition {
  races?: string[];
  classes?: string[];
  raceDef?: IRaceDef;
  classDef?: IClassDef;
}

type TFileTest = (definition: IFileTestDefinition) => IFileFactory;

const FileTest: TFileTest = (definition) => {
  const listDir: (path: string) => string[] =
    (path) => {
      if (path.includes('races')) {
        return definition.races!;
      }
      if (path.includes('classes')) {
        return definition.classes!;
      }
      return [];
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
    listDir,
    loadYAML,
  };
};

export {
  IFileTestDefinition,
  TFileTest,
  FileTest,
};
