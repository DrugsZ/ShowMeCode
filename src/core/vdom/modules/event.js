
import { eq } from '../../util';

function invokeHandler(handler, vnode, event) {
  if (typeof handler === 'function') {
    handler.call(undefined, event, vnode);
  } else {
    console.info('event callback must be function');
  }
}

function handleEvent(event, vnode) {
  const name = event.type;
  const { on } = vnode.props;

  if (on && on[name]) {
    invokeHandler(on[name], vnode, event);
  }
}


function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}

function updateEventListeners(oldVnode, vnode) {
  const oldOn = oldVnode.props.on;
  const oldListener = oldVnode.listener;
  const oldEm = oldVnode.elm;
  const { on } = vnode.props;
  const { elm } = vnode;

  if (eq(oldOn, on)) {
    return;
  }

  if (oldOn && oldListener) {
    if (!on) {
      Object.keys(oldOn).forEach((eventName) => {
        oldEm.removeEventListener(eventName, oldListener, false);
      });
    } else {
      Object.keys(oldOn).forEach((eventName) => {
        if (!on[eventName]) {
          oldEm.removeEventListener(eventName, oldListener, false);
        }
      });
    }
  }

  if (on) {
    const listener = vnode.listener = oldListener || createListener();
    listener.vnode = vnode;

    if (!oldOn) {
      Object.keys(on).forEach((eventName) => {
        elm.addEventListener(eventName, listener, false);
      });
    } else {
      Object.keys(on).forEach((eventName) => {
        if (!oldOn[name]) {
          elm.addEventListener(eventName, listener, false);
        }
      });
    }
  }
}

export default {
  created: updateEventListeners,
  update: updateEventListeners,
};
