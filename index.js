import init, { createElement } from './src/core/vdom';
import classModules from './src/core/vdom/modules/class';
import styleModules from './src/core/vdom/modules/style';
import eventModules from './src/core/vdom/modules/event';
import attrModules from './src/core/vdom/modules/attributes';

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
oldElement = patch(undefined, element);
document.body.appendChild(oldElement.elm);
patch(oldElement, undefined);
// setInterval(() => {
//   attr = attr === 'text' ? 'submit' : 'text';
//   oldElement = element;
//   element = test();
//   patch(oldElement, element);
// }, 5000);
