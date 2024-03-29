/*
 * @Author: zhangyang
 * @Date: 2021-03-16 11:04:54
 * @LastEditTime: 2021-08-27 09:30:32
 * @Description: v-debounce 防抖指令，特定时间内只触发一次
 */
import type { App } from 'vue';
export default {
  install: (app: App<Element>, options: any) => {
    app.directive('debounce', {
      mounted(el: HTMLElement, binding) {
        const { listener, delay, cbk } = binding.value as unknown as DeBounceValue;
        let timer: NodeJS.Timeout | null = null;
        el.addEventListener(listener, (e) => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            cbk(e);
          }, delay);
        });
      }
    });
  }
};

