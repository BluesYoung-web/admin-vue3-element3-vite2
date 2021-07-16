/*
 * @Author: zhangyang
 * @Date: 2021-07-16 17:17:33
 * @LastEditTime: 2021-07-16 17:53:20
 * @Description: 封装 WebSocket 相关的操作
 */
import { useWebSocket } from '@vueuse/core';
import { getToken } from './auth';
import md5 from 'md5';

class MySocket {
  private readonly status;
  private readonly send;
  private readonly data;
  private readonly open;
  private readonly close;
  constructor() {
    const ws_url = import.meta.env.VITE_BASE_WS;
    const { token, aid } = getToken();
    const { status, data, send, open, close } = useWebSocket(`${ws_url}?sign=${md5(aid + token)}&aid=${aid}`, {
      autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed: () => {
          this.reconnectFail();
        }
      }
    });

    this.status = status;
    this.send = send;
    this.data = data;
    this.open = open;
    this.close = close;
  }
  reconnectFail() {
    console.log('自动重连失败');
  }

  async sendMsg(args: SocketMsg) {
    const { msg, success, fail } = args;
    const data = JSON.stringify(msg);
    const res = this.send(data);
    if (res) {
      success && success();
    } else {
      fail && fail();
    }
  }
}
