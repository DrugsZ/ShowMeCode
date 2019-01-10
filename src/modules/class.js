const updateClass = (oldVnode, vnode) => {
  const { elm } = vnode;
  let oldClass = oldVnode.props.className;
  let nClass = vnode.props.className;

  if (!oldClass && !nClass) return;
  if (oldClass === nClass) return;

  oldClass = oldClass || '';
  nClass = nClass || '';

  elm.setAttribute('class', nClass);
};

export default {
  created: updateClass,
  update: updateClass,
};
