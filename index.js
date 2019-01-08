import init, { createElement } from './src/index';
import classModules from './src/modules/class';
import styleModules from './src/modules/style';

const patch = init([classModules, styleModules]);
let a = 7124;
let b = 'ttt';
let oldnode = null;

const style = {
  opacity: 1,
};

const styleOne = {
  opacity: 0,
};

let testStyle = styleOne;
const test = () => (
  <div className={b} style={testStyle}>
    <h3><span>{a}</span></h3>
  </div>
);

const element = (
  <div className="tttt ccc" style={styleOne}>
    <h3><span>{a}</span></h3>
  </div>
);


document.body.appendChild(patch(undefined, element).elm);
oldnode = element;
a += 1;

setInterval(() => {
  a++;
  b = b === 'ttt' ? 'ccc' : 'ttt';
  testStyle = testStyle === styleOne ? style : styleOne;
  const elementOne = test();
  patch(oldnode, elementOne);
  oldnode = elementOne;
}, 1000);
