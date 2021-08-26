/*
 * @Author: zhangyang
 * @Date: 2021-03-09 16:36:49
 * @LastEditTime: 2021-08-26 17:12:52
 * @Description: 模拟数据
 */
import type { Method } from 'axios';
import Mock from 'mockjs';
// 仅为触发装饰器，注册对应的回调
import './Controller/index';
import { controllerMap } from './decorator/MockApi';

export const useMock = () => {
  // 随机延时
  Mock.setup({ timeout: '300-500' });
  // 数据拦截
  const path = import.meta.env.VITE_BASE_HTTP??'/api';
  const reg = new RegExp(path + '.*');
  Mock.mock(reg, (options: {url: string; type: Method; body: any; }) => {
    const { body } = options;
    const com = body.get('com');
    const task = body.get('task');

    const handler = controllerMap.get(`${com}/${task}`);
    return handler?.(body)??{};
  });
}
