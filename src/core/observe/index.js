// import Watcher, { pushTarget } from './watch';
import Dep from './dep';

const defineReactive = (obj, key, val = obj[key]) => {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) return;

  const getter = property && property.get;
  const setter = property && property.set;


  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,

    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.value = value;
        dep.depend();
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

export default class Observe {
  constructor(value) {
    this.value = value;
    walk(value);
  }
}
