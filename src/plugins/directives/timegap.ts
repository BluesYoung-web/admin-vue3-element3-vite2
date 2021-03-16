/*
 * @Author: zhangyang
 * @Date: 2021-03-04 16:25:06
 * @LastEditTime: 2021-03-16 13:48:51
 * @Description: v-timegap 显示当前时间与自定义时间戳之间的间隔
 */
import { App } from 'vue';
const getGap = (el: HTMLElement) => {
  const timestamp = +el.innerText;
  const now = Date.now();
  const diff = now - timestamp;
  const isLastDay = new Date(now).getDay() !== new Date(timestamp).getDay();
  let res = '';
  if (diff <= 60 * 1000) {
    res = `${Math.floor(diff / 1000)} 秒前`;
  } else if (diff > 60 * 1000 && diff <= 3600 * 1000) {
    res = `${Math.floor(diff / (1000 * 60))} 分钟前`;
  } else if (diff > 3600 * 1000 && !isLastDay && diff <= 23 * 3600 * 1000) {
    res = `${Math.floor(diff / (1000 * 3600))} 小时前`;
  } else if (diff > 23 * 3600 * 1000 && diff <= 30 * 24 * 3600 * 1000) {
    res = `${Math.floor(diff / (1000 * 3600 * 24))} 天前`;
  } else if (diff > 30 * 24 * 3600 * 1000 && diff <= 365 * 24 * 3600 * 1000) {
    res = `${Math.floor(diff / (30 * 24 * 3600 * 1000))} 月前`;
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 > 12 ? 12 : date.getMonth() + 1;
    const day = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    res = `${year} 年 ${month} 月 ${day} 日 ${h}:${m}:${s}`;
  }
  el.innerText = res;
}
export default {
  install: (app: App<Element>, options: any) => {
    app.directive('timegap', getGap);
  }
};