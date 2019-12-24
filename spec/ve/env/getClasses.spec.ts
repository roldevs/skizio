// tslint:disable:no-unused-expression
import Bluebird = require('bluebird');
import { expect } from 'chai';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { IVEEnvClassInfo, IVEEnvFactory, VEEnv } from '../../../src/lib/ve-pc/env';
import { IClassDef } from '../../../src/lib/ve-pc/typings/class';

const getClassData: (className: string, localizeName: string) => IClassDef =
  (className, localizeName) => {
    return {
      name: className,
      localize: localizeName,
      hit_dice: 8,
      priorities: {
        attributes: [],
        habilities: [],
      },
      talents: [],
      progress: [],
    };
  };

describe('VEEnv#getClasses', () => {
  const classes: string[] = ['class1.yml', 'class2.yml'];
  const system: string = 've.jdr';

  const file: IFileFactory = {
    addRoot: () => '',
    listDir: () => Bluebird.resolve(classes),
    loadYAML: (path: string) => {
      if (path.includes('class1')) {
        return getClassData('class1', 'Class 1');
      }
      if (path.includes('class2')) {
        return getClassData('class2', 'Class 2');
      }
      return '';
    },
    fileSize: () => 0,
    pickLine: () => Bluebird.resolve(''),
  };

  const env: IVEEnvFactory = VEEnv({ system, file });

  it('return the expected classes', (done: any) => {
    env.getClasses('es').then((classesRet: IVEEnvClassInfo[]) => {
      expect(classesRet).to.eql([{
        name: 'class1',
        localize: 'Class 1',
      }, {
        name: 'class2',
        localize: 'Class 2',
      }]);
      done();
    });
  });
});
