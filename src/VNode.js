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

/**
 * 统一children
 * @param {Array<VNode>} children 将要序列化children
 */
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
  normalizeChildren,
};
