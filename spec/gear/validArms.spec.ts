// tslint:disable:no-unused-expression
import Bluebird from 'bluebird';
import { expect } from 'chai';
import R from 'ramda';
import { Gear, IArm, IGearFactory } from '../../src/lib/ve-pc/src/gear';
import { ILoaderFactory, Loader } from '../../src/lib/ve-pc/src/loader';
import { IFileFactory } from '../../src/lib/ve-pc/typings/file';

describe('Gear#validArms', () => {
  const strengthArms: IArm[] = [{
    name: 'Strength Not for magic user',
    damage: '1d6',
    cost: 15,
    except: ['magic-user'],
  }, {
    name: 'Strength Not for Rogue',
    damage: '1d6',
    cost: 15,
    except: ['rogue'],
  }, {
    name: 'Strength Empty Except',
    damage: '1d6',
    cost: 15,
  }];

  const dexerityArms: IArm[] = [{
    name: 'Dexerety Not for magic user',
    damage: '1d6',
    cost: 15,
    except: ['magic-user'],
  }, {
    name: 'Dexerety Not for Rogue',
    damage: '1d6',
    cost: 15,
    except: ['rogue'],
  }, {
    name: 'Dexerety Empty Except',
    damage: '1d6',
    cost: 15,
  }];

  const gearTestFile: () => IFileFactory = () => {
    const listDir: (path: string) => Bluebird<string[]> = () => Bluebird.resolve([]);
    const loadYAML: (path: string) => any = (path) => {
      if (path.includes('strength')) {
        return strengthArms;
      }
      if (path.includes('dexerety')) {
        return dexerityArms;
      }
      return null;
    };

    return {
      addRoot: () => '',
      listDir,
      loadYAML,
    };
  };

  const loader: ILoaderFactory = Loader({
    file: gearTestFile(),
    locale: 'es',
    system: 've.jdr',
  });

  const gear: IGearFactory = Gear({ loader });

  describe('for magic-user class', () => {
    it('returns all arms except its class', () => {
      const arms: IArm[] = gear.validArms('magic-user');
      expect(arms).to.have.length(4);
      expect(R.map(R.prop('name'), arms)).to.have.members([
        'Strength Not for Rogue',
        'Dexerety Not for Rogue',
        'Strength Empty Except',
        'Dexerety Empty Except',
      ]);
    });
  });

  describe('for rogue class', () => {
    it('returns all arms except its class', () => {
      const arms: IArm[] = gear.validArms('rogue');
      expect(arms).to.have.length(4);
      expect(R.map(R.prop('name'), arms)).to.have.members([
        'Strength Not for magic user',
        'Dexerety Not for magic user',
        'Strength Empty Except',
        'Dexerety Empty Except',
      ]);
    });
  });
});
