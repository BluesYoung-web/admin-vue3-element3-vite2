/*
 * @Author: zhangyang
 * @Date: 2021-08-26 12:22:18
 * @LastEditTime: 2021-08-26 15:35:06
 * @Description: 工具方法
 */
import { IncomingMessage } from 'http';
/**
 * 解析 multipart/form-data 传递的参数
 * 基于 Chrome92 编写于 Linux
 */
const multipartFormDataParse = (str: string): Record<string, any> => {
  const obj: Record<string, any> = {};
  const tempArr = str.split(/------WebKitForm.*(--)?/img).filter(item => item && item !== '\n');
  tempArr.forEach((line) => {
    line = line.substring(40).slice(0, -2);
    if (line) {
      let [key, value] = line.split('"');
      value = value.substring(4);
      obj[key] = value;
    }
  });
  return obj;
}

export const bodyParse = (req: IncomingMessage): Promise<Record<string, any>> => {
  return new Promise((resolve) => {
    let body = '';
    let res: Record<string, any> = {};

    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      try {
        res = multipartFormDataParse(body);
      } catch (err) {
        null;
      }
      resolve(res);
      return;
    });
  });
}
