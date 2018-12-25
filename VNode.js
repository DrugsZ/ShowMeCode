class VNode{
  constructor(tag, props,children){
    props = props ? props : Object.create(null)
    this.tag = tag;
    
    const key = props && props.key;
    this.key = key;
   
    this.props = props;
    this.children = children
    this.elm = null;
    this.text = null;
  }
}

const createElm = (vnode) => {
  if(isPrimitive(vnode.text)){
    return document.createTextNode(vnode.text)
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

const normalizeChildren = (children) => {
  const res = []
  children.forEach(child => {
    if(isPrimitive(child)){
      const node = new VNode();
      node.text = child
      child = node
    }
    res.push(child)
  })

  return res
}

function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

export {
  VNode,
  createElm,
  normalizeChildren
}