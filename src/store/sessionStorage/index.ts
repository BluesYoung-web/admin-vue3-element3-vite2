/*
 * @Author: zhangyang
 * @Date: 2020-12-10 09:01:29
 * @LastEditTime: 2021-09-10 17:34:12
 * @Description: 全局所有的 sessionStorage 存储
 */
import { useSessionStorage } from '@vueuse/core';

enum KEYS  {
  /**
   * 存储用户信息信息
   */
  USER_INFO = 'user_info',
  /**
   * 存储用户导航栏信息
   */
  NAV_ARR = 'nav_arr',
  /**
   * 存储用户拥有访问权限的路由节点
   */
  ROLE_ROUTE = 'role_route',
  /**
   * 存储节点列表中节点的打开快照
   */
  SYSTEM_OPEN_KEYS = 'system_open_keys'
};


export const USER_INFO = useSessionStorage<UserInfo>(KEYS.USER_INFO, {} as any);

export const NAV_ARR = useSessionStorage<NavArrItem[]>(KEYS.NAV_ARR, []);

export const ROLE_ROUTE = useSessionStorage<string[]>(KEYS.ROLE_ROUTE, []);

export const SYSTEM_OPEN_KEYS = useSessionStorage<string[]>(KEYS.SYSTEM_OPEN_KEYS, []);
