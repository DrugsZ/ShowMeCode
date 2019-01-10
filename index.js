import init, { createElement } from './src/index';
import classModules from './src/modules/class';
import styleModules from './src/modules/style';
import eventModules from './src/modules/event';

const patch = init([classModules, styleModules, eventModules]);
let a = 7124;
let b = 'ttt';
let oldnode = null;

const style = {
  opacity: 1,
};

const styleOne = {
  opacity: 0,
};

const eventT = (str, event) => {
  console.log(str, event);
};

const eventTest = eventT.bind(this, 123);

const eventTestTwo = eventT.bind(this, 222);

let evT = eventTest;

const eventTest_1 = () => console.log(111);
let testStyle = styleOne;
const test = () => (
  <div
    className={b}
    style={testStyle}
    onClick={
      evT
    }
  >
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
  evT = evT === eventTest ? eventTestTwo : eventTest;
  testStyle = testStyle === styleOne ? style : styleOne;
  const elementOne = test();
  patch(oldnode, elementOne);
  oldnode = elementOne;
}, 1000);
