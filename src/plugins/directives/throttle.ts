/*
 * @Author: zhangyang
 * @Date: 2021-03-16 11:29:40
 * @LastEditTime: 2021-07-07 11:16:11
 * @Description: v-throttle 节流指令 函数执行一次之后，指定时间内不再执行
 */
import { App } from 'vue';
export default {
  install: (app: App<Element>, options: any) => {
    app.directive('throttle', {
      mounted(el: HTMLElement, binding) {
        const { listener, delay, cbk } = binding.value as unknown as ThrottleValue;
        let timer: NodeJS.Timeout | null = null;
        el.addEventListener(listener, (e) => {
          if (!timer) {
            cbk(e);
            timer = setTimeout(() => timer = null, delay);
          }
        });
      }
    });
  }
};
