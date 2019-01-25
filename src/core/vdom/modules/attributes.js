import { eachObj, eq } from '../../util';

const updateAttributes = (oldVnode, vnode) => {
  let oldAttrs = oldVnode.props.attrs;
  let { attrs } = vnode.props;
  const { elm } = vnode;

  if (!oldAttrs && !attrs) return;
  if (eq(oldAttrs, attrs)) return;

  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  eachObj(attrs, (attr) => {
    const cur = attrs[attr];
    const old = oldAttrs[attr];

    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(attr, '');
      } else if (cur === false) {
        elm.removeAttribute(attr);
      } else {
        elm.setAttribute(attr, cur);
      }
    }
  });

  eachObj(oldAttrs, (attr) => {
    if (!(attr in attrs)) {
      elm.removeAttribute(attr);
    }
  });
};

export default {
  created: updateAttributes,
  update: updateAttributes,
};
