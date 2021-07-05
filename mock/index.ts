/*
 * @Author: zhangyang
 * @Date: 2021-03-09 16:36:49
 * @LastEditTime: 2021-07-02 10:15:16
 * @Description: 模拟数据
 */
import { Method } from 'axios';
import Mock from 'mockjs';
import { operate } from './apis';

export default () => {
  // 随机延时
  Mock.setup({ timeout: '300-500' });
  // 数据拦截
  const path = import.meta.env.VITE_BASE_HTTP??'/api';
  const reg = new RegExp(path + '.*');
  Mock.mock(reg, (options: {url: string; type: Method; body: any; }) => {
    const { url, body } = options;
    const p = new Map(new URLSearchParams(url.substr(5)) as any);
    const data = operate(p as Map<string, any>, body);

    return { status: 0, data, msg: 'ok'};
  });
}
