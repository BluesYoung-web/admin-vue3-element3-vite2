/*
 * @Author: zhangyang
 * @Date: 2020-12-09 16:02:36
 * @LastEditTime: 2021-09-07 17:02:23
 * @Description: 封装不同的请求方法
 */
import net from './net';
import { getToken } from './auth';
import type { Method } from 'axios';

type ParamsObj = Record<string, any>;

/**
 * 不需要 token 的请求，默认 post 请求
 */
const requestWithoutToken = (param: ParamsObj, method: Method = 'post') => {
  const data = new FormData();
  for (const [key, value] of Object.entries(param)) {
    data.append(key, value);
  }
  return net({
    method: 'post',
    data
  });
};

/**
 * 需要 token 的普通请求
 */
const basicRequest = (param: ParamsObj) => {
  const { token, aid } = getToken();
  param['token'] = token;
  param['aid'] = aid;
  return requestWithoutToken(param);
};
/**
 * 文件上传
 */
const upload = (param: ParamsObj, formData: FormData) => {
  const { token, aid } = getToken();
  param['token'] = token;
  param['aid'] = aid;
  for (const [key, value] of Object.entries(param)) {
    formData.append(key, value);
  }
  return net({
    method: 'post',
    data: formData
  });
};

export {
  requestWithoutToken,
  basicRequest,
  upload
};
