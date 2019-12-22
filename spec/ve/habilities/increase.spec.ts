// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { Class, IClassFactory } from '../../../src/lib/ve-pc/src/class';
import { Habilities, IHabilitiesFactory } from '../../../src/lib/ve-pc/src/habilities';
import { IClassDef } from '../../../src/lib/ve-pc/typings/class';
import { IHash } from '../../../src/lib/ve-pc/typings/common';

describe('Habilities#increase', () => {
  const className: string = 'fighter';
  const classDef: IClassDef = {
    name: className,
    localize: className,
    hit_dice: 8,
    priorities: {
      attributes: [],
      habilities: [{
        key: 'alertness',
        value: 2,
      }, {
        key: 'comunication',
        value: 4,
      }, {
        key: 'manipulation',
        value: 1,
      }, {
        key: 'lore',
        value: 5,
      }, {
        key: 'stealth',
        value: 6,
      }, {
        key: 'survival',
        value: 3,
      }],
    },
    talents: {},
    progress: [],
  };
  const cls: IClassFactory = Class(classDef);
  const habilities: IHabilitiesFactory = Habilities({
    class: cls,
  });

  it('increase one of the habilities', () => {
    const values: IHash = habilities.increase({
      alertness: 0,
      comunication: 0,
      manipulation: 0,
      lore: 0,
      stealth: 0,
      survival: 0,
    });
    expect(R.sum(R.values(values))).to.eql(1);
  });

  it('does not increase on the limit', () => {
    const allTen: (v: IHash) => boolean = R.compose(R.all(R.equals(10)), R.values);
    const values: IHash = habilities.increase({
      alertness: 10,
      comunication: 10,
      manipulation: 10,
      lore: 10,
      stealth: 10,
      survival: 10,
    });
    expect(allTen(values)).to.be.true;
  });
});
