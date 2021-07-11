/*
 * @Author: zhangyang
 * @Date: 2020-12-10 11:48:14
 * @LastEditTime: 2021-07-11 17:24:27
 * @Description: 接口定义
 */
interface Rule {
  required?: boolean;
  type?: string;
  trigger: string | string[];
  message?: string;
  validator?: (rule: any, value: any, callback: () => void) => void;
}

interface LoginRule {
  [propname: string]: Rule[];
}