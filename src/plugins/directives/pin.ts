/*
 * @Author: zhangyang
 * @Date: 2021-03-04 17:08:50
 * @LastEditTime: 2021-03-15 14:09:41
 * @Description: v-pin 弹幕组件
 */
import { App, DirectiveBinding } from 'vue';
import { Tween, Easing, update } from '@tweenjs/tween.js';

export interface TextConfig {
  start: number;
  top: number;
  color: string;
}

const danmu = (el: HTMLElement, binding: DirectiveBinding<any>) => {
  let { start, top, color } = binding.value as TextConfig;
  el.style.position = 'fixed';
  el.style.color = color;

  const animation = () => {
    requestAnimationFrame(animation);
    update();
  }
  requestAnimationFrame(animation);

  const originPosition = { x: start, y: top };
  const tween = new Tween(originPosition);
  tween.to({x: 100, y: 300}, 2000)
    .easing(Easing.Bounce.Out)
    .onUpdate(() => el.style.setProperty('transform', `translate(${originPosition.x}px, ${originPosition.y}px)`))
    .repeat(3)
    .start();
}

export default {
  install: (app: App<Element>, options: any) => {
    app.directive('pin', danmu);
  }
};