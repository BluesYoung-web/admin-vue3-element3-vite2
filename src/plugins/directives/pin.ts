/*
 * @Author: zhangyang
 * @Date: 2021-03-04 17:08:50
 * @LastEditTime: 2021-03-05 09:31:23
 * @Description: v-pin 弹幕组件
 */
import { App, DirectiveBinding } from 'vue';

export interface TextConfig {
  start: number;
  top: number;
  color: string;
}

const danmu = (el: HTMLElement, binding: DirectiveBinding<any>) => {
  let { start, top, color } = binding.value as TextConfig;
  el.style.position = 'fixed';
  el.style.top = top + 'px';
  el.style.color = color;

  const animation = () => {
    if (start > 0) {
      start -= 10;
      el.style.left = start + 'px';
    }
    requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
}

export default {
  install: (app: App<Element>, options: any) => {
    app.directive('pin', danmu);
  }
};