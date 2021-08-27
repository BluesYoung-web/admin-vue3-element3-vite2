/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:23:05
 * @LastEditTime: 2021-08-27 10:06:48
 * @Description: 判断变量的类型
 */
const _toString = Object.prototype.toString;
function isArray(arr: any) {
  return _toString.call(arr) === '[object Array]';
}
function isObject(obj: any) {
  return _toString.call(obj) === '[object Object]';
}
function isNumber(num: any) {
  return _toString.call(num) === '[object Number]';
}
function isString(str: any) {
  return _toString.call(str) === '[object String]';
}
function isBoolean(bool: any) {
  return _toString.call(bool) === '[object Boolean]';
}
function isNull(n: any) {
  return _toString.call(n) === '[object Null]';
}
function isUndefined(u: any) {
  return _toString.call(u) === '[object Undefined]';
}
function isMap(m: any) {
  return _toString.call(m) === '[object Map]';
}
function isWeakMap(m: any) {
  return _toString.call(m) === '[object WeakMap]';
}
function isSet(s: any) {
  return _toString.call(s) === '[object Set]';
}
function isWeakSet(s: any) {
  return _toString.call(s) === '[object WeakSet]';
}
function isArrayBuffer(s: any) {
  return _toString.call(s) === '[object ArrayBuffer]';
}
function isRegExp(reg: any) {
  return _toString.call(reg) === '[object RegExp]';
}
function isFunction(f: any) {
  return _toString.call(f) === '[object Function]';
}
function isSymbol(s: any) {
  return _toString.call(s) === '[object Symbol]';
}
export {
  isArray,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isArrayBuffer,
  isRegExp,
  isFunction,
  isSymbol
}
