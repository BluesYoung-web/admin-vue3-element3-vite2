/*
 * @Author: zhangyang
 * @Date: 2020-12-10 11:48:14
 * @LastEditTime: 2021-02-26 15:22:26
 * @Description: 接口定义
 */
interface Rule {
  required?: boolean;
  type?: string;
  trigger: string | string[];
  message?: string;
  validator?: () => void;
}

interface LoginRule {
  [propname: string]: Rule[];
}