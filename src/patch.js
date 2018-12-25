import { isUndef } from './util';

const sameVnode = (old, now) => (
  old.key === now.key && old.tag === now.tag
);

export const patchVnode = (oldVnode, vnode) => {
  if (oldVnode === vnode);
};

export const patch = (oldVnode, vnode) => {
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    const { elm } = oldVnode;
    const parent = elm.parentNode;
    parent.removeChild(elm);
    parent.insertBefore(vnode.elm, elm.nextSibling);
  }
};
