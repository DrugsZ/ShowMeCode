import {createElm,createElement} from './src/index.js';
// const  = VDOM
  let a = 7124
  let b = 4
  let c = true
  const element = (
    <div>
        hello123<span key={a} style={{width:"100px", height:'100px',backgroundColor:'red'}}>world! {c}</span>
    </div>
  );

  const element_1 = (
    <h3 key={b}>2922</h3>
  );

  let elm = createElm(element)
  document.body.appendChild(elm)
  let elm_1 = createElm(element_1)