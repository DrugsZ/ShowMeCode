const test = (target) => {
  console.log(target);
};

class Dep {
  constructor() {
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

test(Dep);
