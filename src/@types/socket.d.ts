/*
 * @Author: zhangyang
 * @Date: 2021-07-16 17:40:56
 * @LastEditTime: 2021-07-17 20:01:47
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
interface SocketMsg_Send {
  cbk: string;
  data: {
    com: number;
    task: number;
    id: number;
    params: any;
  };
  extra?: any;
}
interface SocketMsg_Recive {
  cbk: string;
  data: any;
  extra: any;
}