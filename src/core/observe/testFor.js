import Observe from './index';
import Watcher from './watch';

const data = {
  a: {
    c: 7,
    d: 1,
  },
};
window.test = data;
new Observe(data);
new Observe(data.a);

window.a = new Watcher(data, () => data.a.c + data.a.d, (val) => {
  console.log(val);
});
