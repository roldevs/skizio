import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';
import { dropdown, IDropdownItem } from '../../../../ui/dropdown';
import { IRatsFormModel, IRatsFormModelFactory } from './model';

const texts: any = {
  en: {
    male: 'Male',
    female: 'Female',
    select_gender: 'Select Gender',
    label_gender: 'Gender',
    create_btn_label: 'Create character sheet for Rats in the Walls',
  },
  es: {
    male: 'Hombre',
    female: 'Mujer',
    select_gender: 'Seleccione Género',
    label_gender: 'Género',
    create_btn_label: 'Crear hoja de personaje para Ratas en las Paredes',
  },
};

const genderItems: (locale: string) => IDropdownItem[] =
  (locale) => {
    return [{
      text: texts[locale].male,
      value: 'male',
    }, {
      text: texts[locale].female,
      value: 'female',
    }];
  };

const getGenderText: (model: IRatsFormModelFactory) => string | null =
  (model) => {
    const state: IRatsFormModel = model.stream$();
    return texts[state.locale][state.gender];
  };

const dropdownGender: (model: IRatsFormModelFactory) => VNode =
  (model) => dropdown({
    id: 'gender_dropdown',
    placeholder: texts[model.stream$().locale].select_race,
    value: getGenderText(model),
    name: 'race',
    disabled: false,
    options: genderItems(model.stream$().locale),
    callback: model.setGender,
  }).render();
const createBtn: (model: IRatsFormModelFactory) => VNode =
  (model) => {
    const state: IRatsFormModel = model.stream$();
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

const viewFn: (model: IRatsFormModelFactory) => VNode =
  (model) => {
    const state: IRatsFormModel = model.stream$();
    return h('div', {
      class: {
        ui: true,
        basic: true,
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
                src: `/images/${state.locale}/rats.png`,
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
                h('label', texts[state.locale].label_gender),
                dropdownGender(model),
              ]),
              createBtn(model),
            ]),
          ]),
        ]),
      ]),
    ]);
  };

export default viewFn;
