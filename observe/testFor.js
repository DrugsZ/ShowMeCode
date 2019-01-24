import Observe from './index';
import Watcher from './watch';

const data = {
  a: {
    c: 7,
  },
};
new Observe(data);
new Observe(data.a);
const a = new Watcher(data, 'a', () => {
  console.log(1);
});
const c = new Watcher(data, 'a.c', () => {
  console.log(2);
});
