import { isUndef, isDef, isPrimitive } from '../util';
import { createEmptyVNode } from './VNode';

const sameVnode = (old, now) => (
  old.key === now.key && old.tag === now.tag
);

const emptyNode = createEmptyVNode();

const hooks = ['beforeCreate', 'created', 'update'];

export default function init(modules) {
  let i;
  let j;
  const cbs = {};
  for (i = 0; i < hooks.length; i++) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; j++) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  /**
   * 创建物理DOM
   * @param {VNode} vnode 将要实例DOM的虚拟dom
   * @returns {Element} 物理DOM
   */
  const createElm = (vnode) => {
    if (isPrimitive(vnode.text)) {
      vnode.elm = document.createTextNode(vnode.text);
      return vnode.elm;
    }

    for (i = 0; i < cbs.beforeCreate.length; i++)cbs.beforeCreate[i](emptyNode, vnode);

    const {
      tag,
      children,
    } = vnode;
    vnode.elm = document.createElement(tag);
    const { elm } = vnode;

    if (children) {
      children.forEach((node) => {
        elm.appendChild(createElm(node));
      });
    }
    for (i = 0; i < cbs.created.length; i++)cbs.created[i](emptyNode, vnode);
    return vnode.elm;
  };
  /**
   *
   * @param {Node} parentElm 将被操作的父节点
   * @param {Array<VNode>} vnodes 将要插入的节点
   * @param {Node | null} refNode 参考节点
   * @param {Number} startIdx 开始索引
   * @param {Number} endIdx 结束索引
   */
  const addVnodes = (parentElm, vnodes, refNode, startIdx, endIdx) => {
    for (; startIdx <= endIdx; startIdx += 1) {
      const vnode = vnodes[startIdx];
      parentElm.insertBefore(createElm(vnode), refNode);
    }
  };
  /**
   *
   * @param {Node} parentElm 将被操作的父节点
   * @param {Array<VNode>} vnodes 将要移除的结点
   */
  const removeVnodes = (parentElm, vnodes, startIdx, endIdx) => {
    for (; startIdx <= endIdx; startIdx += 1) {
      const vnode = vnodes[startIdx];
      if (vnode)parentElm.removeChild(vnode.elm);
    }
  };
  const patchVnode = (oldVnode, vnode) => {
    vnode.elm = oldVnode.elm;
    const { elm } = vnode;
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (oldVnode === vnode) return;

    if (isDef(vnode.props)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch);
      } else if (isDef(ch)) {
        addVnodes(elm, ch, null, 0, ch.length - 1);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh);
      } else if (isDef(oldVnode.text)) {
        oldVnode.textContent = '';
      }
    } else if (oldVnode.text !== vnode.text) {
      elm.textContent = vnode.text;
    }
  };

  const createKeyToOldIdx = (children, beginIdx, endIdx) => {
    const map = new Map();
    for (let index = beginIdx; index < endIdx; index++) {
      const ch = children[index];
      const { key } = ch.key;
      map.set(key, index);
    }

    return map;
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
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

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
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx.get(newStartVnode.key);

        if (isUndef(idxInOld)) {
          parentElm.insertBefore(createElm(newStartVnode), oldStartVnode);
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode);
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
        }
        newStartIdx += 1;
        newStartVnode = ch[newStartIdx];
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = ch[newEndIdx + 1] == null ? null : ch[newEndIdx + 1].elm;
        addVnodes(parentElm, ch, before, newStartIdx, newEndIdx);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  const patch = (oldVnode, vnode) => {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        const { elm } = oldVnode;
        const parent = elm.parentNode;
        if (parent !== null) {
          removeVnodes(parent, [oldVnode], 0, 0);
        }
      }
      return;
    }

    if (isUndef(oldVnode)) {
      createElm(vnode);
    } else if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode);
    } else {
      const { elm } = oldVnode;
      const parent = elm.parentNode;
      createElm(vnode);

      if (parent !== null) {
        parent.insertBefore(vnode.elm, elm.nextSibling);
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }


    return vnode;
  };


  return patch;
}
