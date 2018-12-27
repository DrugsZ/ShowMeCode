import { isUndef, isDef } from './util';

import { createElm } from './VNode';

const sameVnode = (old, now) => (
  old.key === now.key && old.tag === now.tag
);

export default function init(modules) {
  const addVnodes = (parentElm, vnodes) => {
    const len = vnodes.length;
    for (let i = 0; i < len; i++) {
      const vnode = vnodes[i];
    }
  };
  const removeVnodes = (parentElm, vnodes) => {

  };
  const patchVnode = (oldVnode, vnode) => {
    vnode.elm = oldVnode.elm;
    const { elm } = vnode;
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (oldVnode === vnode) return;

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch);
      } else if (isDef(ch)) {
        addVnodes(elm, ch);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh);
      }
    } else if (oldVnode.text !== vnode.text) {
      elm.textContent = vnode.text;
    }
  };

  function updateChildren(parentElm, oldCh, ch) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[oldStartIdx];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = ch.length - 1;
    let newStartVnode = ch[newStartIdx];
    let newEndVnode = ch[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartIdx += 1;
        oldStartVnode = oldCh[oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldStartIdx -= 1;
        oldEndVnode = oldCh[oldStartIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartIdx += 1;
        newStartIdx += 1;
        oldStartVnode = oldCh[oldStartIdx];
        newStartVnode = ch[newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndIdx -= 1;
        newEndIdx -= 1;
        oldEndVnode = oldCh[oldEndIdx];
        newEndVnode = ch[newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode);
        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
        oldEndIdx -= 1;
        newStartIdx += 1;
        oldEndVnode = oldCh[oldEndIdx];
        oldStartVnode = oldCh[oldStartIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newStartVnode);
        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
        oldStartIdx += 1;
        newEndIdx -= 1;
        oldStartVnode = oldCh[oldEndIdx];
        newEndVnode = ch[newEndIdx];
      }
    }
  }

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
