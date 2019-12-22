// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { HitPoints } from '../../../src/lib/rats/src/points/hitPoints';
import { EGender, IRatsPC } from '../../../src/lib/rats/typings/pc';

describe('HitPoints#calculate', () => {
  const brawn: number = 5;
  // A PC with brawn
  const pc: IRatsPC = {
    brawn,
    dexterity: 0,
    violence: 0,
    wits: 0,
    willpower: 0,
    hp: 0,
    sp: 0,
    profession: {
      title: '',
      description: '',
    },
    reputation: {
      title: '',
      description: '',
    },
    gear: [],
    arms: { name: '', damage: '' },
    name: '',
    gender: EGender.female,
    imageUrl: '',
  };

  it('incrementes hit points accordingly to brawn', () => {
    expect(HitPoints().calculate(pc).hp).to.eql(10 + brawn);
  });
});
