// tslint:disable:no-unused-expression
import Bluebird from 'bluebird';
import { expect } from 'chai';
import R from 'ramda';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { Gear, IArm, IArmor, IGearFactory } from '../../../src/lib/ve-pc/src/gear';
import { ILoaderFactory, Loader } from '../../../src/lib/ve-pc/src/loader';

describe('Gear#buyArmors', () => {
  const armors: IArmor[] = [{
    name: 'Armor 1',
    defence: 1,
    cost: 15,
  }, {
    name: 'Armor 2',
    defence: 1,
    cost: 15,
    except: ['magic-user'],
  }, {
    name: 'Armor 3',
    defence: 1,
    cost: 15,
    except: ['rogue'],
  }, {
    name: 'Armor 4',
    defence: 1,
    cost: 30,
  }];

  const gearTestFile: () => IFileFactory = () => {
    const listDir: (path: string) => Bluebird<string[]> = () => Bluebird.resolve([]);
    const loadYAML: (path: string) => any = () => armors;

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
    it('returns armors that his money can buy', () => {
      const buyed: IArmor[] = gear.buyArmors('magic-user', 20);
      expect(buyed).to.have.length(1);
      R.forEach((arm: IArmor) => {
        expect(arm.name).to.have.oneOf([
          'Armor 1',
          'Armor 3',
        ]);
      }, buyed);
    });
  });
  describe('for rogue class', () => {
    it('returns armors that his money can buy', () => {
      const buyed: IArmor[] = gear.buyArmors('rogue', 20);
      expect(buyed).to.have.length(1);
      R.forEach((arm: IArmor) => {
        expect(arm.name).to.have.oneOf([
          'Armor 1',
          'Armor 2',
        ]);
      }, buyed);
    });
  });
  describe('for magic-user class with not enough money', () => {
    it('returns no armors', () => {
      const buyed: IArm[] = gear.buyArms('magic-user', 0);
      expect(buyed).to.have.length(0);
    });
  });
});
