import init, { createElement } from './src/index';
import classModules from './src/modules/class';
import styleModules from './src/modules/style';
import eventModules from './src/modules/event';
import attrModules from './src/modules/attributes';

const patch = init([classModules, styleModules, eventModules, attrModules]);

const attr = 'text';
const value = 77;

const test = () => (
  <div>
    <input
      type={attr}
      value={value}
      onInput={
      (e) => {
        console.log(e);
      }
    }
    />
  </div>
);
let oldElement;
const element = test();
document.body.appendChild(patch(undefined, element).elm);
// setInterval(() => {
//   attr = attr === 'text' ? 'submit' : 'text';
//   oldElement = element;
//   element = test();
//   patch(oldElement, element);
// }, 5000);
