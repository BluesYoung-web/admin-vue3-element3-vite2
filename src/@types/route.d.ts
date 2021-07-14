/*
 * @Author: zhangyang
 * @Date: 2021-07-14 15:02:58
 * @LastEditTime: 2021-07-14 15:09:42
 * @Description: 路由相关
 */
interface YoungRoute {
  path: string;
  name: string;
  query: any;
  fullPath: string;
  meta: {
    title: string;
    icon?: string;
    affix?: boolean;
    noCache?: boolean;
  };
  component?: any;
  redirect?: string;
  children?: YoungRoute[];
  hidden?: boolean;
}
