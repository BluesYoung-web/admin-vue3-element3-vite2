/*
 * @Author: zhangyang
 * @Date: 2021-09-17 16:06:24
 * @LastEditTime: 2021-09-17 16:06:25
 * @Description:
 */
interface MenuItem {
  title: string;
  handlerName: string;
}
type MenuHandlers = Record<string, () => void>;
