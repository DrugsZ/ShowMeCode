const uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    if (this.subs.length) {
      const index = this.subs.findIndex(sub);
      if (index > -1) {
        return this.subs.splice(index, 1);
      }
    }
  }

  notify() {
    const subs = this.subs.slice();
    subs.forEach(sub => sub());
  }
}

const targetStack = [];
export const pushTarget = (_target) => {
  if (_target)targetStack.push(_target);
  Dep.target = target;
};

export const popTarget = () => {
  Dep.target = targetStack.pop();
};
