// import Watcher, { pushTarget } from './watch';
import Dep from './dep';
import { isObject } from '../util';

const defineReactive = (obj, key, val = obj[key]) => {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) return;

  const getter = property && property.get;
  const setter = property && property.set;

  const childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,

    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();
        // dep.addSub(Dep.target);
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;

      if (Object.is(value, newVal)) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      dep.notify();
    },
  });
};


const walk = (obj) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

export default class Observer {
  constructor(value) {
    this.value = value;
    walk(value);
  }
}


export const observe = (value) => {
  if (!isObject(value)) {
    return;
  }

  let ob;
  if (Reflect.has('__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }

  return ob;
};
