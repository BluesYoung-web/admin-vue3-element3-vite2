/*
 * @Author: zhangyang
 * @Date: 2021-03-16 11:04:54
 * @LastEditTime: 2021-03-16 11:44:30
 * @Description: v-debounce 防抖指令，特定时间内只触发一次
 */
import { App } from 'vue';
export default {
  install: (app: App<Element>, options: any) => {
    app.directive('debounce', {
      mounted(el: HTMLElement, binding) {
        const { listener, delay, cbk } = binding.value;
        let timer: NodeJS.Timeout | null = null;
        el.addEventListener(listener, (e) => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            cbk?.(e);
          }, delay);
        });
      }
    });
  }
};

