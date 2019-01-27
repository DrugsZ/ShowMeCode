let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = new Map();
  }

  addSub(sub) {
    if (!this.subs.has(sub.id)) {
      this.subs.set(sub.id, sub);
    }
  }

  depend() {
    Dep.target.addDep(this);
  }

  removeSub(sub) {
    let result;
    if (this.subs.has(sub.id)) {
      result = this.subs.get(sub.id);
      this.subs.delete(sub.id);
    }
    return result;
    // if (this.subs.length) {
    //   const index = this.subs.findIndex(sub);
    //   if (index > -1) {
    //     return this.subs.splice(index, 1);
    //   }
    // }
  }

  notify() {
    // const subs = this.subs.slice();
    // subs.forEach(sub => sub());
    this.subs.forEach(sub => sub.update());
  }
}

const targetStack = [];
export const pushTarget = (_target) => {
  if (_target)targetStack.push(_target);
  Dep.target = _target;
};

export const popTarget = () => {
  Dep.target = targetStack.pop();
};
