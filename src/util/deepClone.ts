/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:21:58
 * @LastEditTime: 2021-08-16 14:58:00
 * @Description: 深度克隆
 */
import { isArray } from './isType';
export default function deepClone(obj: any) {
  // 常见的 非 值
  if ([null, undefined, NaN, false].includes(obj)) {
    return obj;
  }
  // 原始数据类型
  if (typeof obj !== 'object') {
    return obj;
  }
  const temp:any = isArray(obj) ? [] : {};
  for (const key in obj) {
    // 日期 | 正则 | 函数 类型的属性特殊处理
    if ([Date, RegExp, Function].some((_type) => obj[key] instanceof _type)) {
      temp[key] = obj[key];
      continue;
    }
    if (obj.hasOwnProperty(key)) {
      // 子属性值是否为复杂数据类型
      temp[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return temp;
}
