// import { parsePath } from '../src/util';
import { pushTarget, popTarget } from './dep.js';

export default class Watcher {
  constructor(content, expOrFn, cb) {
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.content = content;
    this.getter = parsePath(this.expOrFn);

    this.get();
  }

  get() {
    pushTarget(this.cb);
    // const value = this.content[this.expOrFn];
    const value = this.getter.call(this.content, this.content);
    popTarget();
    return value;
  }
}
