/*
 * @Author: zhangyang
 * @Date: 2021-07-16 17:17:33
 * @LastEditTime: 2021-07-17 19:36:52
 * @Description: 封装 WebSocket 相关的操作
 */
import { useWebSocket } from '@vueuse/core';
import { getToken } from './auth';
import md5 from 'md5';

export class MySocket {
  private readonly status;
  private readonly send;
  public readonly data;
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
  /**
   * 发文本消息
   */
  sendMsg(args: SocketMsg) {
    const { msg, success, fail } = args;
    const data = JSON.stringify(msg);
    const res = this.send(data);
    if (res) {
      success && success();
    } else {
      fail && fail();
    }
  }
  /**
   * 文件上传
   */
  async fileUpload(args: SocketFileMsg) {
    const { msg, blob, success, fail } = args;
    // 普通消息与二进制数据不能混合发送，目前没有更好的解决办法
    // 先发送一条普通消息，在发送二进制数据
    await this.sendMsg({ msg });
    return new Promise((resolve, reject) => {
      const res = this.send(blob);
      if (res) {
        success && success();
        resolve(true);
      } else {
        fail && fail();
        reject(false);
      }
    });
  }
};

export enum MsgConf {
  '上传图片' = '999-1',
  '上传音频' = '999-2',
};
