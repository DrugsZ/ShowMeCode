const setTarget = (target) => {
  target.target = null;
};


class Watcher {
  constructor(content, expOrFn, cb) {
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.content = content;

    this.get();
  }

  get() {
    pushTarget(this.cb);
    const value = this.content[this.expOrFn];
    return value;
  }
}

const pushTarget = (target) => {
  Watcher.target = target;
};
setTarget(Watcher);
