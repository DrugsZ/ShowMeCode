import init, { createElement } from './src/index';

const patch = init();
console.log(patch);
const a = 7124;
const test = s => console.log(s);
const testOne = s => console.log(s);
const classR = 'r';
const element = (
  <div className="test test1">
        hello123
    <span onClick={test} onKeyDown={testOne} tabIndex={0} role="button" key={a} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>
        world!
    </span>
  </div>
);

// const elementOne = (
//   <h1>
//         hello123
//     <span key={a} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>
//       world!
//     </span>
//   </h1>
// );
// const elementOne = (
//   <h3 key={b}>2922</h3>
// );

console.log(element);

document.body.appendChild(patch(undefined, element).elm);

// setTimeout(() => {
//   patch(element, elementOne);
// }, 3000);
