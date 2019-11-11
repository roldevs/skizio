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
    },
    create_btn_label: 'Create character sheet for Vieja Escuela',
  },
  es: {
    race: 'Raza',
    select_race: 'Seleccione una Raza',
    class: 'Clase',
    select_class: 'Seleccione una Clase',
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
    },
    create_btn_label: 'Crear hoja de personaje para Vieja Escuela',
  },
};

const raceItems: (locale: string) => IDropdownItem[] =
  (locale: string) => {
    return [{
      id: 'elf',
      text: texts[locale].races.elf,
      value: 'elf',
    }, {
      id: 'dwarf',
      text: texts[locale].races.dwarf,
      value: 'dwarf',
    }, {
      id: 'halfling',
      text: texts[locale].races.halfling,
      value: 'halfling',
    }, {
      id: 'human',
      text: texts[locale].races.human,
      value: 'human',
    }];
  };

const classItems: (locale: string) => IDropdownItem[] =
  (locale) => {
    return [{
      id: 'fighter',
      text: texts[locale].classes.fighter,
      value: 'fighter',
    }, {
      id: 'magic-user',
      text: texts[locale].classes['magic-user'],
      value: 'magic-user',
    }, {
      id: 'rogue',
      text: texts[locale].classes.rogue,
      value: 'rogue',
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

const createBtn: (model: IVEFormModelFactory) => VNode =
  (model) => {
    const state: IVEFormModel = model.stream$();
    return h('a', {
      attrs: {
        href: `/api/ve/pc/${state.locale}/${state.level}/${state.race}/${state.class}/sheet.png`,
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
    return h('div', { attrs: { id: 'body' }, class: { ui: true, form: true } }, [
      h('div', { class: { inline: true, field: true } }, [
        h('label', texts[state.locale].race),
        dropdownRaces(model),
      ]),
      h('div', { class: { inline: true, field: true } }, [
        h('label', texts[state.locale].class),
        dropdownClasses(model),
      ]),
      createBtn(model),
    ]);
  };

export default viewFn;
