import { parsePath } from '../util';
import { pushTarget, popTarget } from './dep.js';


let uid = 0;
export default class Watcher {
  constructor(content, expOrFn, cb) {
    this.id = uid++;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.content = content;
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(this.expOrFn);
    }


    this.value = this.get();
  }

  get() {
    pushTarget(this);
    // const value = this.content[this.expOrFn];
    const value = this.getter.call(this.content, this.content);
    popTarget();
    return value;
  }

  update() {
    const oldVal = this.value;
    this.value = this.get();

    if (!Object.is(oldVal, this.value)) {
      this.cb.call(this.content, this.value, oldVal);
    }
  }
}
