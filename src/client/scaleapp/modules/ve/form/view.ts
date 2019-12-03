import * as R from 'ramda';
import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';
import { IVEEnvClassInfo, IVEEnvRaceInfo } from '../../../../../lib/ve-pc/env';
import { dropdown, IDropdownItem } from '../../../../ui/dropdown';
import { IVEFormModel, IVEFormModelFactory } from './model';

const texts: any = {
  en: {
    race: 'Race',
    select_race: 'Choose a Race',
    class: 'Class',
    select_class: 'Choose a Class',
    select_bonus: 'Choose Bonus range',
    label_bonus: 'Bonus',
    select_level: 'Choose a level',
    label_level: 'Level',
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
    select_level: 'Seleccione un nivel',
    label_level: 'Nivel',
    create_btn_label: 'Crear hoja de personaje para Vieja Escuela',
    bonus: {
      two: '-2/+2 Bonus',
      three: '-3/+3 Bonus',
    },
  },
};

const boldClass: (className: string) => boolean =
  (className) => R.includes(
    className,
    ['cleric', 'explorer', 'fighter', 'magic-user', 'paladin', 'rogue'],
  );

const boldRace: (race: string) => boolean =
  (raceName) => R.includes(
    raceName,
    ['dwarf', 'elf', 'halfling', 'human'],
  );

const getItem: (boldFn: (name: string) => boolean) => (item: IVEEnvClassInfo | IVEEnvRaceInfo) => IDropdownItem =
  (boldFn) => (item) => {
    return {
      text: item.localize,
      value: item.name,
      bold: boldFn(item.name),
    };
  };

const raceItems: (model: IVEFormModelFactory) => IDropdownItem[] =
  (model) => R.map(getItem(boldRace), model.stream$().races);

const classItems: (model: IVEFormModelFactory) => IDropdownItem[] =
  (model) => R.map(getItem(boldClass), model.stream$().classes);

const levelItems: (locale: string) => IDropdownItem[] =
  () => {
    return R.map((level: number) => {
      level += 1;
      return {
        text: level.toString(),
        value: level.toString(),
      };
    }, R.times(R.identity, 14));
  };

const typeBonusItems: (locale: string) => IDropdownItem[] =
  (locale) => {
    return [{
      text: texts[locale].bonus.two,
      value: 'twoBonus',
    }, {
      text: texts[locale].bonus.three,
      value: 'threeBonus',
    }];
  };

const getSelectedRace: (model: IVEFormModelFactory) => IDropdownItem | undefined =
  (model) => {
    const state: IVEFormModel = model.stream$();
    return R.find(R.propEq('value', state.race), raceItems(model));
  };

const getSelectedClass: (model: IVEFormModelFactory) => IDropdownItem | undefined =
  (model) => {
    const state: IVEFormModel = model.stream$();
    return R.find(R.propEq('value', state.class), classItems(model));
  };

const getRaceText: (model: IVEFormModelFactory) => string | null =
  (model) => {
    const state: IVEFormModel = model.stream$();
    const race: string | null = state.race;
    if (!race) {
      return null;
    }
    const selectedRace: IDropdownItem | undefined = getSelectedRace(model);
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
    const selectedClass: IDropdownItem | undefined = getSelectedClass(model);
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
    options: raceItems(model),
    callback: model.setRace,
  }).render();

const dropdownClasses: (model: IVEFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'class_dropdown',
    placeholder: texts[model.stream$().locale].select_class,
    value: getClassText(model),
    name: 'class',
    disabled: false,
    options: classItems(model),
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

const dropdownLevel: (model: IVEFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'level_dropdown',
    placeholder: texts[model.stream$().locale].select_level,
    value: model.stream$().level.toString(),
    name: 'level',
    disabled: false,
    options: levelItems(model.stream$().locale),
    callback: model.setLevel,
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
        segment: true,
      },
    }, [
      h('div', {
        class: {
          ui: true,
          active: state.loading,
          inverted: true,
          dimmer: true,
        },
      }, [
        h('div', {
          class: {
            ui: true,
            loader: true,
          },
        }),
      ]),
      h('div', {
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
              h('div', { class: { inline: true, field: true } }, [
                h('label', texts[state.locale].label_level),
                dropdownLevel(model),
              ]),
              createBtn(model),
            ]),
          ]),
        ]),
      ]),
    ]);
  };

export default viewFn;
