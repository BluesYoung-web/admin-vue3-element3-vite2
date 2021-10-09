/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:21:58
 * @LastEditTime: 2021-10-09 09:41:40
 * @Description: 深度克隆
 */
export const deepClone = (obj: any) => {
  // 常见的 非 值
  if ([null, undefined, NaN, false].includes(obj)) {
    return obj;
  }
  // 原始数据类型
  if (typeof obj !== 'object') {
    return obj;
  }
  const root = isArray(obj) ? [] : {};
  // 定义循环栈
  const loopList: any = [{
    parent: root,
    key: undefined,
    data: obj
  }];

  while (loopList.length) {
    // 深度优先遍历
    const { parent, key, data } = loopList.pop() as any;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = isArray(data) ? [] : {};
    }

    for (let [childKey, value] of Object.entries(data)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !([Date, RegExp, Function].some((_type) => value instanceof _type))
      ) {
        //  普通对象入栈，留待后续循环处理
        loopList.push({
          parent: res,
          key: childKey,
          data: value
        });
      } else {
        //  特殊对象，直接赋值
        res[childKey] = value;
      }
    }
  }

  return root;
};

export default deepClone;
