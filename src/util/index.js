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
