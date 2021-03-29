/*
 * @Author: zhangyang
 * @Date: 2020-12-09 16:02:36
 * @LastEditTime: 2021-03-29 16:06:23
 * @Description: 封装不同的请求方法
 */
import net from './net';
import { getToken } from './auth';
import { Method } from 'axios';

interface ParamsObj {
  [property: string]: any;
}

/**
 * 不需要 token 的请求，默认 post 请求
 */
const requestWithoutToken = (param: ParamsObj, method: Method = 'post') => {
  return net({
    url: `?${new URLSearchParams(param).toString()}`,
    method
  });
};

/**
 * 需要 token 的普通请求
 */
const basicRequest = (param: ParamsObj) => {
  const { token, aid } = getToken();
  param['token'] = token;
  param['aid'] = aid;
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
 * 文件上传
 */
const upload = (param: ParamsObj, formData: FormData) => {
  const { token, aid } = getToken();
  param['token'] = token;
  param['aid'] = aid;
  return net({
    url: `?${new URLSearchParams(param).toString()}`,
    method: 'post',
    headers: { 'Content-type': 'multipart/form-data' },
    data: formData
  });
};

export {
  requestWithoutToken,
  basicRequest,
  upload
}