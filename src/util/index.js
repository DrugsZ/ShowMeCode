export const isUndef = s => s === undefined;

export const isDef = s => s !== undefined;

/**
 *
 * @param {*} value 判定值
 * @returns boolean
 */
export function isPrimitive(value) {
  return (
    typeof value === 'string'
      || typeof value === 'number'
      // $flow-disable-line
      || typeof value === 'symbol'
      || typeof value === 'boolean'
  );
}


export function cached(fn) {
  const cache = Object.create(null);
  return (function createFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
}

export const eachObj = (obj, cb) => {
  if (typeof obj !== 'object') return;
  if (typeof cb !== 'function') return;

  const keys = Object.keys(obj);
  keys.forEach((key, index, keys) => {
    cb.call(null, key, index, keys);
  });
};

const toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}

const deepEq = (a, b, aStack, bStack) => {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  const className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return `${a}` === `${b}`;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
    default:
  }

  const areArrays = className === '[object Array]';
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    const aCtor = a.constructor;


    const bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }


  aStack = aStack || [];
  bStack = bStack || [];
  let { length } = aStack;

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  // 数组判断
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  }
  // 对象判断
  else {
    const keys = Object.keys(a);


    let key;
    length = keys.length;

    if (Object.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }

  aStack.pop();
  bStack.pop();
  return true;
};


/**
 * 对比两个值是否相等,
 * 引用自https://github.com/mqyqingfeng/Blog/issues/41
 * @param {*} a 第一个值
 * @param {*} b 第二个值
 * @param {Array?} aStack 循环引用队列
 * @param {*} bStack 循环引用队列
 */
export const eq = (a, b, aStack, bStack) => {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  const type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
};

const bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function getter(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
