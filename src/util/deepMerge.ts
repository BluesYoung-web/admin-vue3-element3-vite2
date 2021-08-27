/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:31:39
 * @LastEditTime: 2021-08-27 10:39:49
 * @Description: 对象深度合并
 */
/**
 * 对象深度合并
 * @param {object} target 合并后的对象
 * @param {object} source 要合并的对象
 */
export default function deepMerge(target: any = {}, source: any = {}) {
  target = deepClone(target);
  if (typeof target !== 'object' || typeof source !== 'object') {
    return false;
  }
  for (const key in source) {
    if (!source.hasOwnProperty(key)) {
      continue;
    }
    if (key in target) {
      if (typeof target[key] !== 'object') {
        target[key] = source[key];
      } else {
        if (typeof source[key] !== 'object') {
          target[key] = source[key];
        } else {
          if (target[key].concat && source[key].concat) {
            target[key] = target[key].concat(source[key]);
          } else {
            target[key] = deepMerge(target[key], source[key]);
          }
        }
      }
    } else {
      target[key] = source[key];
    }
    return target;
  }
}
