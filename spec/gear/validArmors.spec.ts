// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Gear, IArm, IArmor, IGearFactory } from '../../src/lib/ve-pc/src/gear';
import { ILoaderFactory, Loader } from '../../src/lib/ve-pc/src/loader';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';

describe('Gear#validArmors', () => {
  const armors: IArmor[] = [{
    name: 'Armor Not for magic user',
    defence: 1,
    cost: 15,
    except: ['magic-user'],
  }, {
    name: 'Armor Not for Rogue',
    defence: 1,
    cost: 15,
    except: ['rogue'],
  }, {
    name: 'Armor Empty Except',
    defence: 1,
    cost: 15,
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
    system: 've.jdr',
  });

  const gear: IGearFactory = Gear({ loader });

  describe('for magic-user class', () => {
    it('returns all arms except its class', () => {
      const arms: IArmor[] = gear.validArmors('magic-user');
      expect(arms).to.have.length(2);
      expect(R.map(R.prop('name'), arms)).to.have.members([
        'Armor Not for Rogue',
        'Armor Empty Except',
      ]);
    });
  });

  describe('for rogue class', () => {
    it('returns all arms except its class', () => {
      const arms: IArmor[] = gear.validArmors('rogue');
      expect(arms).to.have.length(2);
      expect(R.map(R.prop('name'), arms)).to.have.members([
        'Armor Not for magic user',
        'Armor Empty Except',
      ]);
    });
  });
});
