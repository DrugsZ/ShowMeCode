import { VNode, normalizeChildren } from './VNode';

import init from './patch';

export default init;

export function createElement(tag, props, ...children) {
  let newChildren;
  if (children) {
    newChildren = normalizeChildren(children);
  }
  return new VNode(tag, props || {}, newChildren);
}
