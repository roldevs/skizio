// tslint:disable:no-unused-expression
import { expect } from 'chai';
import R from 'ramda';
import { SanityPoints } from '../../../src/lib/rats/src/points/sanityPoints';
import { EGender, IRatsPC } from '../../../src/lib/rats/typings/pc';

describe('SanityPoints#calculate', () => {
  const willpower: number = 5;
  // A PC with willpower
  const pc: IRatsPC = {
    brawn: 0,
    dexterity: 0,
    violence: 0,
    wits: 0,
    willpower,
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

  it('incrementes sanity points accordingly to willpower', () => {
    expect(SanityPoints().calculate(pc).sp).to.eql(10 + willpower);
  });
});
