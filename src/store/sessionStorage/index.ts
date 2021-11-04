/*
 * @Author: zhangyang
 * @Date: 2020-12-10 09:01:29
 * @LastEditTime: 2021-11-04 19:39:22
 * @Description: 全局所有的 sessionStorage 存储
 */
import { useSessionStorage } from '@vueuse/core';
import type { RouteRecordRaw } from 'vue-router';

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
  SYSTEM_OPEN_KEYS = 'system_open_keys',
  /**
   * 网站全局配置
   */
  APP_CONFIG = 'app_config',
  /**
   * 侧边导航数组
   */
  LEFT_NAV = 'left_nav',
  /**
   * 所有的路由记录
   */
  ALL_ROUTES = 'all_routes',
  /**
   * 是否使用真实服务器
   */
  USE_REAL_SERVER = 'use_real_server'
};


export const USER_INFO = useSessionStorage<UserInfo>(KEYS.USER_INFO, {} as any);

export const NAV_ARR = useSessionStorage<NavArrItem[]>(KEYS.NAV_ARR, []);

export const ROLE_ROUTE = useSessionStorage<string[]>(KEYS.ROLE_ROUTE, []);

export const SYSTEM_OPEN_KEYS = useSessionStorage<string[]>(KEYS.SYSTEM_OPEN_KEYS, []);

export const APP_CONFIG = useSessionStorage<App_Config>(KEYS.APP_CONFIG, {
  sidebar_opened: true
} as App_Config);

export const LEFT_NAV = useSessionStorage<NavArrItem[]>(KEYS.LEFT_NAV, []);

export const ALL_ROUTES = useSessionStorage<RouteRecordRaw[]>(KEYS.ALL_ROUTES, []);

export const USE_REAL_SERVER = useSessionStorage<boolean>(KEYS.USE_REAL_SERVER,
  !!import.meta.env.VITE_ENABLE_PI
  // https 里面不允许发起 http 请求
  // location.protocol === 'http:'
);
