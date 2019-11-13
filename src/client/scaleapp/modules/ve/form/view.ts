import * as R from 'ramda';
import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';
import { dropdown, IDropdownItem } from '../../../../ui/dropdown';
import { IVEFormModel, IVEFormModelFactory } from './model';

const texts: any = {
  en: {
    race: 'Race',
    select_race: 'Choose a Race',
    class: 'Class',
    select_class: 'Choose a Class',
    label_bonus: 'Bonus',
    select_bonus: 'Choose Bonus range',
    races: {
      elf: 'Elf',
      dwarf: 'Dwarf',
      halfling: 'Halfling',
      human: 'Human',
    },
    classes: {
      'fighter': 'Fighter',
      'magic-user': 'Magic User',
      'rogue': 'Rogue',
      'cleric': 'Cleric',
      'paladin': 'Paladin',
      'explorer': 'Explorer',
      'bard': 'Bard',
      'multiform': 'Multiform',
    },
    create_btn_label: 'Create character sheet for Vieja Escuela',
    bonus: {
      two: '-2/+2 Bonus',
      three: '-3/+3 Bonus',
    },
  },
  es: {
    race: 'Raza',
    select_race: 'Seleccione una Raza',
    class: 'Clase',
    select_class: 'Seleccione una Clase',
    label_bonus: 'Bonus',
    select_bonus: 'Seleccione un rango de Bonus',
    races: {
      elf: 'Elfo',
      dwarf: 'Enano',
      halfling: 'Mediano',
      human: 'Humano',
    },
    classes: {
      'fighter': 'Guerrero',
      'magic-user': 'Hechicero',
      'rogue': 'Bribón',
      'cleric': 'Clérigo',
      'paladin': 'Paladín',
      'explorer': 'Explorador',
      'bard': 'Bardo',
      'multiform': 'Multiforme',
    },
    create_btn_label: 'Crear hoja de personaje para Vieja Escuela',
    bonus: {
      two: '-2/+2 Bonus',
      three: '-3/+3 Bonus',
    },
  },
};

const raceItems: (locale: string) => IDropdownItem[] =
  (locale: string) => {
    const getItem: (cls: string) => IDropdownItem =
      (cls) => {
        return {
          id: cls,
          text: texts[locale].races[cls],
          value: cls,
        };
      };
    return R.map(
      getItem,
      ['elf', 'dwarf', 'halfling', 'human'],
    );
  };

const classItems: (locale: string) => IDropdownItem[] =
  (locale) => {
    const getItem: (cls: string) => IDropdownItem =
      (cls) => {
        return {
          id: cls,
          text: texts[locale].classes[cls],
          value: cls,
        };
      };
    return R.map(
      getItem,
      ['fighter', 'magic-user', 'rogue', 'cleric', 'paladin', 'explorer', 'bard', 'multiform'],
    );
  };

const typeBonusItems: (locale: string) => IDropdownItem[] =
  (locale) => {
    return [{
      id: 'twoBonus',
      text: texts[locale].bonus.two,
      value: 'twoBonus',
    }, {
      id: 'threeBonus',
      text: texts[locale].bonus.three,
      value: 'threeBonus',
    }];
  };

const getSelectedRace: (race: string, locale: string) => IDropdownItem | undefined =
  (race, locale) => R.find(R.propEq('value', race), raceItems(locale));

const getSelectedClass: (cls: string, locale: string) => IDropdownItem | undefined =
  (cls, locale) => R.find(R.propEq('value', cls), classItems(locale));

const getRaceText: (model: IVEFormModelFactory) => string | null =
  (model) => {
    const state: IVEFormModel = model.stream$();
    const race: string | null = state.race;
    if (!race) {
      return null;
    }
    const selectedRace: IDropdownItem | undefined = getSelectedRace(race, state.locale);
    if (!selectedRace) {
      return null;
    }
    return selectedRace.text;
  };

const getBonusText: (model: IVEFormModelFactory) => string | null =
  (model) => {
    const state: IVEFormModel = model.stream$();
    if (state.threeBonus === 'twoBonus') {
      return texts[state.locale].bonus.two;
    }
    return texts[state.locale].bonus.three;
  };

const getClassText: (model: IVEFormModelFactory) => string | null =
  (model) => {
    const state: IVEFormModel = model.stream$();
    const cls: string | null = state.class;
    if (!cls) {
      return null;
    }
    const selectedClass: IDropdownItem | undefined = getSelectedClass(cls, state.locale);
    if (!selectedClass) {
      return null;
    }
    return selectedClass.text;
  };

const dropdownRaces: (model: IVEFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'race_dropdown',
    placeholder: texts[model.stream$().locale].select_race,
    value: getRaceText(model),
    name: 'race',
    disabled: false,
    options: raceItems(model.stream$().locale),
    callback: model.setRace,
  }).render();

const dropdownClasses: (model: IVEFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'class_dropdown',
    placeholder: texts[model.stream$().locale].select_class,
    value: getClassText(model),
    name: 'class',
    disabled: false,
    options: classItems(model.stream$().locale),
    callback: model.setClass,
  }).render();

const dropdownBonus: (model: IVEFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'bonus_dropdown',
    placeholder: texts[model.stream$().locale].select_bonus,
    value: getBonusText(model),
    name: 'bonus',
    disabled: false,
    options: typeBonusItems(model.stream$().locale),
    callback: model.setBonus,
  }).render();

const createBtn: (model: IVEFormModelFactory) => VNode =
  (model) => {
    const state: IVEFormModel = model.stream$();
    return h('a', {
      attrs: {
        href: state.url,
        target: '_blank',
      },
      class: {
        ui: true,
        primary: true,
        button: true,
        disabled: !model.stream$().createBtnEnabled,
      },
    }, texts[state.locale].create_btn_label);
  };

const viewFn: (model: IVEFormModelFactory) => VNode =
  (model) => {
    const state: IVEFormModel = model.stream$();
    return h('div', {
      class: {
        ui: true,
        items: true,
      },
    }, [
      h('div', {
        class: {
          item: true,
        },
      }, [
        h('div', {
          class: {
            image: true,
          },
        }, [
          h('img', {
            attrs: {
              src: '/images/ve.jdr.png',
            },
          }),
        ]),
        h('div', {
          class: {
            content: true,
          },
        }, [
          h('div', { attrs: { id: 'body' }, class: { ui: true, form: true } }, [
            h('div', { class: { inline: true, field: true } }, [
              h('label', texts[state.locale].race),
              dropdownRaces(model),
            ]),
            h('div', { class: { inline: true, field: true } }, [
              h('label', texts[state.locale].class),
              dropdownClasses(model),
            ]),
            h('div', { class: { inline: true, field: true } }, [
              h('label', texts[state.locale].label_bonus),
              dropdownBonus(model),
            ]),
            createBtn(model),
          ]),
        ]),
      ]),
    ]);
  };

export default viewFn;
