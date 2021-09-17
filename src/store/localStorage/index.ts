/*
 * @Author: zhangyang
 * @Date: 2021-09-17 15:43:58
 * @LastEditTime: 2021-09-17 15:47:50
 * @Description: 全局所有的 localStorage 存储
 */
import { useLocalStorage } from '@vueuse/core';

enum KEYS {
  HEAD_NAV_INDEX = '__顶部导航索引__'
};

export const HEAD_NAV_INDEX = useLocalStorage(KEYS.HEAD_NAV_INDEX, '0');
