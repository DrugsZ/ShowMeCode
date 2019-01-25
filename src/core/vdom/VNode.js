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

/**
 * 创建空白虚拟节点
 * @returns {VNode}
 */
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

const normalizeEvent = (props) => {
  if (!props) {
    return {};
  }
  const newProps = props || {};
  const res = {};
  const rp = new RegExp(/^on/);

  Object.keys(newProps).forEach((key) => {
    if (rp.test(key)) {
      const newkey = key.replace(rp, '').toLowerCase();
      res[newkey] = newProps[key];
      delete newProps[key];
    }
  });

  newProps.on = res || {};

  return newProps;
};

const normalizeAttrs = (props) => {
  if (!props) {
    return {};
  }

  const newProps = props || {};
  const res = {};

  const otherAttr = ['on', 'className', 'style'];
  Object.keys(newProps).forEach((key) => {
    if (!otherAttr.includes(key)) {
      res[key] = newProps[key];
      delete newProps[key];
    }
  });

  newProps.attrs = res || {};

  return newProps;
};

const normalizeProps = (props) => {
  const newPropsPassEvent = normalizeEvent(props);
  const newPropsPassAttrs = normalizeAttrs(newPropsPassEvent);
  return newPropsPassAttrs;
};
export {
  VNode,
  normalizeChildren,
  normalizeProps,
};
