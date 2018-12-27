import init, { createElement } from './src/index';

const patch = init();
let a = 7124;
let oldnode = null;

const test = () => (
  <div>
    <h3><span>{a}</span></h3>
  </div>
);

let element = test();

document.body.appendChild(patch(undefined, element).elm);
oldnode = element;
a += 1;

setInterval(() => {
  a += 1;
  element = test();
  patch(oldnode, element);
  oldnode = element;
}, 1000);
