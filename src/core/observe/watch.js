import { parsePath } from '../util';
import { pushTarget, popTarget } from './dep.js';


let uid = 0;
export default class Watcher {
  constructor(content, expOrFn, cb) {
    this.id = uid++;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.content = content;
    this.deps = new Map();
    this.newDeps = new Map();
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(this.expOrFn);
    }


    this.value = this.get();
  }

  addDep(dep) {
    const { id } = dep;
    if (!this.newDeps.has(id)) {
      this.newDeps.set(id, dep);
      if (!this.deps.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    this.deps.forEach((dep) => {
      if (!this.newDeps.has(dep.id)) {
        dep.removeSub(this);
      }
    });

    [this.deps, this.newDeps] = [this.newDeps, this.deps];
    this.newDeps.clear();
  }

  get() {
    pushTarget(this);
    let value;
    // const value = this.content[this.expOrFn];
    try {
      value = this.getter.call(this.content, this.content);
    } catch (error) {
      console.log(error);
    } finally {
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  update() {
    const oldVal = this.value;
    this.value = this.get();

    if (!Object.is(oldVal, this.value)) {
      this.cb.call(this.content, this.value, oldVal);
    }
  }

  teardown() {
    this.deps.forEach(dep => dep.removeSub(this));
  }
}
