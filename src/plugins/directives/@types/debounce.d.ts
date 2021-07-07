/*
 * @Author: zhangyang
 * @Date: 2021-07-07 11:03:15
 * @LastEditTime: 2021-07-07 11:15:47
 * @Description: 节流 防抖
 */
type ThrottleValue = DeBounceValue;
interface DeBounceValue {
  listener: keyof WindowEventMap;
  delay: number;
  cbk(e: Event): void;
}
