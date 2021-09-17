/*
 * @Author: zhangyang
 * @Date: 2021-07-03 15:05:07
 * @LastEditTime: 2021-09-17 10:45:06
 * @Description: 延时执行
 */
export const sleep = async (n: number) => {
  return new Promise((resolve) => setTimeout(resolve, n * 1000));
};
