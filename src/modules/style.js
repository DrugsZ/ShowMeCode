import { cached } from '../util';

let emptyStyle;

const normalize = cached((prop) => {
  emptyStyle = emptyStyle || document.createElement('div').style;
  if (prop in emptyStyle) {
    return prop;
  }
});

const cssVarRE = /^--/;
const importantRE = /\s*!important$/;

/**
 * 设置`Element`元素的`style`属性
 * @param {Element} el 要设置属性的`Element`
 * @param {String} name 属性名称
 * @param {String | Number} val 属性值
 */
const setProp = (el, name, val) => {
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    const normalizedName = normalize(name);
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

let cur;
function updateStyle(oldVnode, vnode) {
  let oldStyle = oldVnode.props.style;
  let { style } = vnode.props;
  const { elm } = vnode;

  if (!oldStyle && !style) return;
  if (Object.is(oldStyle, style)) return;

  oldStyle = oldStyle || {};
  style = style || {};

  Object.keys(oldStyle).forEach((key) => {
    if (!style[key]) {
      setProp(elm, key, '');
    }
  });


  Object.keys(style).forEach((key) => {
    cur = style[key];

    if (cur !== oldStyle[key]) {
      setProp(elm, key, cur == null ? '' : cur);
    }
  });
}


export default {
  created: updateStyle,
  update: updateStyle,
};
