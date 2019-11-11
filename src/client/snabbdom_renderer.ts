import {init} from 'snabbdom';
import AttrsModule from 'snabbdom/modules/attributes';
import ClassModule from 'snabbdom/modules/class';
import EventListenersModule from 'snabbdom/modules/eventlisteners';
import PropsModule from 'snabbdom/modules/props';
import StyleModule from 'snabbdom/modules/style';
import {VNode} from 'snabbdom/vnode';

const render: (
  oldVNode: VNode | HTMLElement,
  vnode: VNode,
) => void =
function(oldVNode, vnode) {
  // Init patch function with choosen modules
  const patch: any = init([
    ClassModule,
    AttrsModule,
    PropsModule,
    StyleModule,
    EventListenersModule,
  ]);
  return patch(oldVNode, vnode);
};

export default render;
