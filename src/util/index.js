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
