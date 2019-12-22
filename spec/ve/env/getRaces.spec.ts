// tslint:disable:no-unused-expression
import Bluebird = require('bluebird');
import { expect } from 'chai';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { IVEEnvFactory, IVEEnvRaceInfo, VEEnv } from '../../../src/lib/ve-pc/env';
import { IRaceDef } from '../../../src/lib/ve-pc/typings/race';

const getRaceData: (raceName: string, localizeName: string) => IRaceDef =
  (raceName, localizeName) => {
    return {
      movement: 8,
      name: raceName,
      localize: localizeName,
      talents: [],
    };
  };

describe('VEEnv#getRaces', () => {
  const races: string[] = ['race1.yml', 'race2.yml'];
  const system: string = 've.jdr';
  const locale: string = 'es';

  const file: IFileFactory = {
    addRoot: () => '',
    listDir: () => Bluebird.resolve(races),
    loadYAML: (path: string) => {
      if (path.includes('race1')) {
        return getRaceData('race1', 'Race 1');
      }
      if (path.includes('race2')) {
        return getRaceData('race2', 'Race 2');
      }
      return '';
    },
  };

  const env: IVEEnvFactory = VEEnv({ system, file });

  it('return the expected races', (done: any) => {
    env.getRaces('es').then((racesRet: IVEEnvRaceInfo[]) => {
      expect(racesRet).to.eql([{
        name: 'race1',
        localize: 'Race 1',
      }, {
        name: 'race2',
        localize: 'Race 2',
      }]);
      done();
    });
  });
});
