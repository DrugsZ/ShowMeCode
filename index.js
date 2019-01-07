import init, { createElement } from './src/index';
import classModules from './src/modules/class';

const patch = init([classModules]);
let a = 7124;
let b = 'ttt';
let oldnode = null;

const test = () => (
  <div className={b}>
    <h3><span>{a}</span></h3>
  </div>
);

const element = (
  <div className="tttt ccc">
    <h3><span>{a}</span></h3>
  </div>
);


document.body.appendChild(patch(undefined, element).elm);
oldnode = element;
a += 1;

setInterval(() => {
  a++;
  b = b === 'ttt' ? 'ccc' : 'ttt';
  const elementOne = test();
  patch(oldnode, elementOne);
  oldnode = elementOne;
}, 1000);
