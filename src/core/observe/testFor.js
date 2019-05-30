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
const divInfo = document.querySelector('div');
const input = document.querySelector('input');
input.addEventListener('keyup', (e) => {
  test.a.c = e.target.value;
});

window.a = new Watcher(data, 'a.c', (val) => {
  divInfo.innerHTML = val;
});
