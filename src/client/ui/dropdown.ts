import * as R from 'ramda';
import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';

interface IDropdownItem {
  id: string;
  text: string;
  value: any;
}

interface IDropdownConfig {
    id: string;
    placeholder: string;
    value: string | null;
    name: string;
    disabled: boolean;
    options: IDropdownItem[];
    callback: (option: IDropdownItem) => void;
}

type TDropdown = (config: IDropdownConfig) => {
  render: () => VNode,
};

const findOption: (options: IDropdownItem[], value: string) => IDropdownItem | undefined =
(options, value) => R.find(R.propEq('value', value), options);

const doEvent: (config: IDropdownConfig) => (value: any, text: any, $selectedItem: any) => void =
(config) => (value) => {
  if (!config.disabled) {
    const option: IDropdownItem | undefined = findOption(config.options, value);
    if (option) {
      config.callback(option);
    }
  }
};

const items: (
  config: {
    options: IDropdownItem[],
  },
) => VNode[] =
(config) => {
  return R.map(function(option: IDropdownItem) {
    return h('div', {
      class: {
        item: true,
      },
      attrs: {
        'data-value': option.id,
      },
    }, [
      option.text,
    ]);
  }, config.options);
};

const dropDropDownMenu: (config: IDropdownConfig) => VNode[] =
(config) => {
  return [
    h('i', {
      class: {
        dropdown: true,
        icon: true,
      },
    }),
    h('div', {
      class: {
        default: true,
        text: true,
      },
    }, config.value || config.placeholder),
    h('div', {
      class: {
        menu: true,
      },
    }, items({
      options: config.options,
    })),
  ];
};

const dropdownHook: (config: IDropdownConfig) => (vnode: VNode) => any =
(config) => (vnode) => {
  const $elm: any = $(vnode.elm!);
  $elm.dropdown({
    action: 'hide',
    onChange: doEvent(config),
  });
};

const dropDropDown: (config: IDropdownConfig) => VNode =
(config) => {
  return h('div', {
    class: {
      ui: true,
      fluid: true,
      selection: true,
      dropdown: true,
      disabled: config.disabled,
    },
    hook: {
      insert: dropdownHook(config),
      update: dropdownHook(config),
    },
  }, dropDropDownMenu(config));
};

const dropdown: TDropdown = (config) => {
  const render: () => VNode = () => dropDropDown(config);

  return {
    render,
  };
};

export { IDropdownConfig, IDropdownItem, dropdown };
