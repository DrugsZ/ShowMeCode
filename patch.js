export const patch = (oldVnode,vnode) => {
  if(sameVnode(oldVnode,vnode)){
    console.log(`can next`)
  }else{
    const elm = oldVnode.elm;
    const parent = elm.parentNode;
    parent.removeChild(elm);
    parent.insertBefore(vnode.elm, elm.nextSibling)
  }
}

const sameVnode = (old,now) => {
  return (
    old.key === now.key && old.tag === now.tag
  )
}