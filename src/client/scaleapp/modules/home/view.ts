import * as R from 'ramda';
import {h} from 'snabbdom';
import {VNode} from 'snabbdom/vnode';
import { IHomeModel, IHomeModelFactory } from './model';

const texts: any = {
  en: {
    ve: {
      title: 'Vieja Escuela',
      description: '',
    },
    rats: {
      title: 'Rats in the Walls',
      description: 'An rpg where intrepid investigators face cosmic horrors in a desperate struggle to save mankind.',
    },
  },
  es: {
    ve: {
      title: 'Vieja Escuela',
      description: '',
    },
    rats: {
      title: 'Ratas en las paredes',
      description: 'Un juego de rol donde intrépidos investigadores se enfrentan a horrores cósmicos en un intento desesperado de salvar a la humanidad.',
    },
  },
};

interface IGameItem {
  title: string;
  description: string;
  image: string;
  url: string;
}

const gameItemNode: (options: IGameItem) => VNode =
  ({ title, description, image, url}) => {
    return h('div', {
      class: {
        ui: true,
        item: true,
      },
    }, [
      h('div', {
        class: {
          ui: true,
          small: true,
          image: true,
        },
      }, [
        h('a', {
          class: { header: true },
          attrs: { href: url },
        }, [
          h('img', {
            attrs: {
              src: image,
            },
          }),
        ]),
      ]),
      h('div', {
        class: {
          content: true,
        },
      }, [
        h('a', {
          class: { header: true },
          attrs: { href: url },
        }, title),
        h('div', {
          class: {
            content: true,
          },
        }, description),
      ]),
    ]);
  };

const items: (locle: string) => IGameItem[] =
  (locale) => {
    return [{
      title: texts[locale].ve.title,
      description: texts[locale].ve.description,
      image: `/images/ve.jdr.png`,
      url: `#/${locale}/ve`,
    }, {
      title: texts[locale].rats.title,
      description: texts[locale].rats.description,
      image: `/images/${locale}/rats.png`,
      url: `#/${locale}/rats`,
    }];
  };

const getItemNodes: (locale: string) => VNode[] =
  (locale) => R.map(gameItemNode, items(locale));

const viewFn: (model: IHomeModelFactory) => VNode =
  (model) => {
    const state: IHomeModel = model.stream$();
    return h('div', {
      class: {
        ui: true,
        divided: true,
        items: true,
      },
    }, getItemNodes(state.locale));
  };

export default viewFn;
