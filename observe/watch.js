// import { parsePath } from '../src/util';

const setTarget = (target) => {
  target.target = null;
};


class Watcher {
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
    Watcher.target = null;
    return value;
  }
}

const pushTarget = (target) => {
  Watcher.target = target;
};
setTarget(Watcher);
