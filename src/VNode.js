import { isPrimitive } from './util';


class VNode {
  constructor(tag, props = {}, children) {
    this.tag = tag;

    const key = props && props.key;
    this.key = key;

    this.props = props;
    this.children = children;
    this.elm = undefined;
    this.text = undefined;
  }
}

const createElm = (vnode) => {
  if (isPrimitive(vnode.text)) {
    return document.createTextNode(vnode.text);
  }

  const {
    tag,
    props = {},
    children,
  } = vnode;
  vnode.elm = document.createElement(tag);
  const { elm } = vnode;

  const {
    style = {},
  } = props;

  Object.keys(style).forEach((key) => {
    elm.setAttribute(key, style[key]);
  });

  if (children) {
    children.forEach((node) => {
      elm.appendChild(createElm(node));
    });
  }

  return vnode.elm;
};

/**
 *
 * @param {string | number | symbol | boolean} str 创建文字节点的值
 * @return vnode
 */
const createTextNode = (str) => {
  const node = new VNode();
  node.text = str;
  return node;
};

export const createEmptyVNode = () => new VNode();

const normalizeChildren = (children) => {
  const res = [];
  let newChild = Object.create(null);
  children.forEach((child) => {
    if (isPrimitive(child)) {
      newChild = createTextNode(child);
    } else {
      newChild = child;
    }
    res.push(newChild);
  });

  return res;
};

export {
  VNode,
  createElm,
  normalizeChildren,
};
