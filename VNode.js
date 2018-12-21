class VNode{
  constructor(tag, props,children){
    props = props ? props : Object.create(null)
    this.tag = tag;
    
    const key = props && props.key;
    this.key = key;
   
    this.props = props;
    this.children = children
    this.elm = null;
    this.text = '';
  }
}

const createElm = (vnode) => {
  if(typeof vnode === 'string'){
    return document.createTextNode(vnode)
  }

  const {
    tag, 
    props,
    children} = vnode;
  const elm = vnode.elm = document.createElement(tag);
  
  const {
    style = {}
  } = props

  Object.keys(style).forEach(key => {
    elm.setAttribute(key,style[key])
  })

  if(children){
    children.forEach(node => {
      elm.appendChild(createElm(node))
    })
  }

  return elm
}

export {
  VNode,
  createElm
}