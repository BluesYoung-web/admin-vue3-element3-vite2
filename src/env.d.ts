/*
 * @Author: zhangyang
 * @Date: 2021-07-02 10:13:01
 * @LastEditTime: 2021-11-04 19:38:52
 * @Description: import.meta.env.xxx 智能提示
 */
interface ImportMetaEnv {
  /**
   * 后台标题，可选
   */
  VITE_TITLE?: string;
  /**
   * HTTP 请求地址
   */
  VITE_BASE_HTTP: string;
  /**
   * WebSocket 连接地址
   */
  VITE_BASE_WS: string;
  /**
   * 树莓派提供的真实服务器地址(内网穿透，可能不在线)
   */
  VITE_PI_HTTP: string;
  /**
   * 树莓派提供的真实服务器地址(内网穿透，可能不在线)
   */
  VITE_PI_WS: string;
   /**
    *  是否启用真实请求混入
    */
  VITE_ENABLE_PI?: boolean;
}
