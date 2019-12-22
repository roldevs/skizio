// tslint:disable:no-unused-expression
import Bluebird = require('bluebird');
import { expect } from 'chai';
import { IFileFactory } from '../../../src/lib/common/typings/file';
import { ILoaderConfig, ILoaderFactory, Loader } from '../../../src/lib/ve-pc/src/loader';
import { ILocalizeFactory, Localize } from '../../../src/lib/ve-pc/src/localize';
import { IClassDef } from '../../../src/lib/ve-pc/typings/class';
import { IPC } from '../../../src/lib/ve-pc/typings/pc';
import { IRaceDef } from '../../../src/lib/ve-pc/typings/race';
import { ITalentDef, ITalentLocaleInfo } from '../../../src/lib/ve-pc/typings/talent';

describe('Localize#getRace', () => {
  const raceName: string = 'Elfo';
  const movement: number = 12;
  const raceTalents: ITalentDef = {
    1: ['talent1', 'talent2'],
  };
  const raceDef: IRaceDef = {
    name: 'elf',
    localize: raceName,
    movement,
    talents: raceTalents,
  };
  const className: string = 'Guerrero';
  const hitDice: number = 8;
  const attributes = [{
    key: 'strength',
    value: 1,
  }, {
    key: 'dexerety',
    value: 2,
  }, {
    key: 'constitution',
    value: 3,
  }];
  const habilities = [{
    key: 'alertness',
    value: 4,
  }, {
    key: 'comunication',
    value: 3,
  }, {
    key: 'manipulation',
    value: 5,
  }, {
    key: 'lore',
    value: 6,
  }, {
    key: 'stealth',
    value: 1,
  }, {
    key: 'survival',
    value: 2,
  }];
  const classTalents: ITalentDef = {
    1: ['talent3', 'talent4'],
  };
  const progress = [{
    atk: 1,
    mp: 2,
    ins: 3,
  }];
  const classDef: IClassDef = {
    name: 'fighter',
    localize: className,
    hit_dice: hitDice,
    priorities: {
      attributes,
      habilities,
    },
    talents: classTalents,
    progress,
  };
  const talentsLocaleInfo: ITalentLocaleInfo = {
    talent1: {
      title: 'Talent 1',
      description: '',
    },
    talent2: {
      title: 'Talent 2',
      description: '',
    },
    talent3: {
      title: 'Talent 3',
      description: '',
    },
    talent4: {
      title: 'Talent 4',
      description: '',
    },
  };

  const fileTestConfig: IFileFactory = {
    addRoot: () => '',
    listDir: () => Bluebird.resolve([]),
    loadYAML: (path: string) => {
      if (path.includes('race')) {
        return raceDef;
      }
      if (path.includes('talent')) {
        return talentsLocaleInfo;
      }
      return classDef;
    },
  };
  const config: ILoaderConfig = {
    file: fileTestConfig,
    locale: 'es',
    system: 've.jdr',
  };
  const loader: ILoaderFactory = Loader(config);
  const localize: ILocalizeFactory = Localize({ loader });

  const pc: IPC = {
    race: 'elf',
    class: 'fighter',
    level: 0,
    movement: 0,
    attributes: {},
    attr_bonus: {},
    habilities: {},
    talents: ['talent1', 'talent2', 'talent3', 'talent4'],
    atk: null,
    mp: 0,
    ins: 0,
    pv: 0,
    def: '',
    background: '',
    money: 0,
    arms: [],
    armors: [],
  };

  it('returns the race name', () => {
    expect(localize.pc(pc).race).to.eql('Elfo');
  });

  it('returns the class name', () => {
    expect(localize.pc(pc).class).to.eql('Guerrero');
  });

  it('returns all talents', () => {
    expect(localize.pc(pc).talents).to.eql(['Talent 1, Talent 2, Talent 3, Talent 4']);
  });
});
