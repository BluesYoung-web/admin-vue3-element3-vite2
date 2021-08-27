/*
 * @Author: zhangyang
 * @Date: 2021-03-04 15:59:42
 * @LastEditTime: 2021-08-27 09:30:39
 * @Description: v-focus 自动聚焦指令，适用于原生元素
 */
import type { App } from 'vue';
export default {
  install: (app: App<Element>, options: any) => {
    app.directive('focus', {
      mounted(el: HTMLElement) {
        el.focus();
      }
    });
  }
};
