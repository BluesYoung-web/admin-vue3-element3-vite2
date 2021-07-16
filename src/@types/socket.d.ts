/*
 * @Author: zhangyang
 * @Date: 2021-07-16 17:40:56
 * @LastEditTime: 2021-07-16 17:41:11
 * @Description: websocket 相关
 */
interface SocketMsg {
  msg: any;
  success ?: () => void;
  fail ?: () => void;
}
interface SocketFileMsg extends SocketMsg {
  blob: Blob | ArrayBuffer;
}
