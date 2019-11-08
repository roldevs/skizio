// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Gear, IArm, IArmor, IGearFactory } from '../../src/gear';
import { ILoaderFactory, Loader } from '../../src/loader';
import { IFileFactory } from '../../typings/file';

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
    const listDir: (path: string) => string[] = () => [];
    const loadYAML: (path: string) => any = () => armors;

    return {
      listDir,
      loadYAML,
    };
  };

  const loader: ILoaderFactory = Loader({
    root: './',
    file: gearTestFile(),
    locale: 'es',
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
