// tslint:disable:no-unused-expression
import Bluebird from 'bluebird';
import { expect } from 'chai';
import R from 'ramda';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { Gear, IArm, IArmor, IGearFactory } from '../../../src/lib/ve-pc/src/gear';
import { ILoaderFactory, Loader } from '../../../src/lib/ve-pc/src/loader';

describe('Gear#buyArms', () => {
  const arms: IArm[] = [{
    name: 'Arm 1',
    damage: '1d6',
    cost: 15,
  }, {
    name: 'Arm 2',
    damage: '1d6',
    cost: 15,
  }, {
    name: 'Arm 3',
    damage: '1d6',
    cost: 15,
    except: ['rogue'],
  }, {
    name: 'Arm 4',
    damage: '1d6',
    cost: 15,
    except: ['magic-user'],
  }, {
    name: 'Arm 5',
    damage: '1d6',
    cost: 31,
  }];

  const gearTestFile: () => IFileFactory = () => {
    const listDir: (path: string) => Bluebird<string[]> = () => Bluebird.resolve([]);
    const loadYAML: (path: string) => any = () => arms;

    return {
      addRoot: () => '',
      listDir,
      loadYAML,
      fileSize: () => 0,
      pickLine: () => Bluebird.resolve(''),
    };
  };

  const loader: ILoaderFactory = Loader({
    file: gearTestFile(),
    locale: 'es',
    system: 've.jdr',
  });

  const gear: IGearFactory = Gear({ loader });

  describe('for magic-user class', () => {
    it('returns arms that his money can buy', () => {
      const buyed: IArm[] = gear.buyArms('magic-user', 30);
      expect(buyed).to.have.length(2);
      R.forEach((arm: IArm) => {
        expect(arm.name).to.have.oneOf([
          'Arm 1',
          'Arm 2',
          'Arm 3',
        ]);
      }, buyed);
    });
  });
  describe('for rogue class', () => {
    it('returns armors that his money can buy', () => {
      const buyed: IArm[] = gear.buyArms('rogue', 30);
      expect(buyed).to.have.length(2);
      R.forEach((arm: IArm) => {
        expect(arm.name).to.have.oneOf([
          'Arm 1',
          'Arm 2',
          'Arm 4',
        ]);
      }, buyed);
    });
  });
  describe('for magic-user class with money for just one arm', () => {
    it('returns only one arm', () => {
      const buyed: IArm[] = gear.buyArms('magic-user', 15);
      expect(buyed).to.have.length(1);
      R.forEach((arm: IArm) => {
        expect(arm.name).to.have.oneOf([
          'Arm 1',
          'Arm 2',
          'Arm 3',
        ]);
      }, buyed);
    });
  });
  describe('for magic-user class with not enough money', () => {
    it('returns no arms', () => {
      const buyed: IArm[] = gear.buyArms('magic-user', 0);
      expect(buyed).to.have.length(0);
    });
  });
});
