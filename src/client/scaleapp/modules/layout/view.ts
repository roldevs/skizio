import * as R from 'ramda';
import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';
import { ILayoutModelFactory } from './model';

interface IMenuOption {
  label: string;
  link: string;
  icon?: {
    [key: string]: boolean;
  };
}

const texts: any = {
  en: {
    ve: 'Vieja Escuela',
    rats: 'Rats in the Walls',
  },
  es: {
    ve: 'Vieja Escuela',
    rats: 'Ratas en las paredes',
  },
};

const dropdownHook: () => (vnode: VNode) => any =
() => (vnode) => {
  const $elm: any = $(vnode.elm!);
  $elm.dropdown({
    action: 'hide',
  });
};

const menuIcon: (option: IMenuOption) => VNode | null =
(option) => {
  if (!option.icon) {
    return null;
  }
  return h('i', { class: option.icon });
};

const menuItem: (option: IMenuOption) => VNode =
  (option) => h('div', {
    class: { item: true },
  }, [
    h('div', {
      class: { content: true },
    }, [
      menuIcon(option),
      h('a', { attrs: { href: option.link } }, option.label ),
    ]),
  ]);

const localeLabel: (locale: string) => VNode =
(locale) => {
  if (locale === 'en') {
    return h('div', [
      h('i', { class: {
          gb: true,
          flag: true,
        },
      }),
      'English',
    ]);
  }
  return h('div', [
    h('i', { class: {
        es: true,
        flag: true,
      },
    }),
    'Español',
  ]);
};

const menu: (label: VNode, options: IMenuOption[]) => VNode =
(label, options) => h('div', {
    class: {
      ui: true,
      dropdown: true,
      item: true,
    },
    hook: {
      insert: dropdownHook(),
      update: dropdownHook(),
    },
  }, [
    label,
    h('i', {
      class: {
        dropdown: true,
        icon: true,
      },
    }),
    h('div', {
      class: {
        menu: true,
      },
    }, R.map(menuItem, options)),
  ]);

const localeDropdown: (locale: string) => VNode =
  (locale) => menu(localeLabel(locale), [{
    link: '#/es/home',
    label: 'Español',
    icon: {
      es: true,
      flag: true,
    },
  }, {
    link: '#/en/home',
    label: 'English',
    icon: {
      gb: true,
      flag: true,
    },
  }]);

const topNav: (locale: string) => VNode =
(locale) => {
  return h('div', {
    class: {
      ui: true,
      fixed: true,
      inverted: true,
      menu: true,
    },
  }, [
    h('div', {
      class: {
        ui: true,
        container: true,
      },
    }, [
      h('a', {
        class: {
          header: true,
          item: true,
        },
        attrs: { href: `#/${locale}/home` },
      }, 'Skizio' ),
      h('a', {
        class: { item: true },
        attrs: { href: `#/${locale}/ve` },
      }, texts[locale].ve ),
      h('a', {
        class: { item: true },
        attrs: { href: `#/${locale}/rats` },
      }, texts[locale].rats ),
    ]),
    localeDropdown(locale),
  ]);
};

const viewFn: (model: ILayoutModelFactory) => VNode =
(model) => {
  return h('div', {
    props: {
      id: 'application',
    },
  }, [
    topNav(model.stream$().locale),
    h('div', {
      class: {
        ui: true,
        main: true,
        segment: true,
        text: true,
        container: true,
      },
    }, [
      h('div', { props: { id: 'body' } } ),
    ]),
  ]);
};

export default viewFn;
