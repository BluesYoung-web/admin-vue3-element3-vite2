/*
 * @Author: zhangyang
 * @Date: 2021-08-26 15:38:03
 * @LastEditTime: 2021-08-26 16:03:46
 * @Description: 注册 mock
 */
export const controllerMap = new Map<string, Young.MockItem>()
export const MockApi = (_path: string) => {
  return (target: any, _name: any, desc: any) => {
    controllerMap.set(_path, desc.value);
  };
};
