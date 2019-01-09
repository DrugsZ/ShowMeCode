import { VNode, normalizeChildren, normalizeEvent } from './VNode';

import init from './patch';

export default init;

export function createElement(tag, props, ...children) {
  let newChildren;
  const newProps = normalizeEvent(props);
  if (children) {
    newChildren = normalizeChildren(children);
  }
  return new VNode(tag, newProps || {}, newChildren);
}
