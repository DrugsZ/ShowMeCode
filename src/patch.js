import { isUndef, isDef } from './util';

import { createElm } from './VNode';

const sameVnode = (old, now) => (
  old.key === now.key && old.tag === now.tag
);

export default function init(modules) {
  const patchVnode = (oldVnode, vnode) => {
    vnode.elm = oldVnode.elm;
    const { elm } = vnode;
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (oldVnode === vnode) return;
  };


  const patch = (oldVnode, vnode) => {
    if (isUndef(oldVnode)) {
      createElm(vnode);
    } else if (isDef(vnode)) {
      if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode);
      } else {
        const { elm } = oldVnode;
        const parent = elm.parentNode;
        createElm(vnode);
        parent.removeChild(elm);
        parent.insertBefore(vnode.elm, elm.nextSibling);
      }
    }


    return vnode;
  };


  return patch;
}
