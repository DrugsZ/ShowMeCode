import { createElm, VNode } from './VNode';
import {patch} from './patch'
console.log(createElm)
function createElement( tag, props, ...children ) {
  return new VNode(tag,props,children)
}
let a = 7
let b = 4
const element = (
  <div>
      hello<span key={a} style={{width:"100px", height:'100px',backgroundColor:'red'}}>world!</span>
  </div>
);

const element_1 = (
  <h3 key={b}>2922</h3>
);

let elm = createElm(element)
document.body.appendChild(elm)
let elm_1 = createElm(element_1)

patch(element,element_1)