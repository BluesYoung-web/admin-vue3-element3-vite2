/*
 * @Author: zhangyang
 * @Date: 2020-12-08 11:26:10
 * @LastEditTime: 2021-09-17 10:53:03
 * @Description: HTTP 网络请求模块
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ILoadingInstance } from 'element-plus';
import { ElLoading } from 'element-plus';
import { removeToken } from './auth';

/**
 * 加载动画实例
 */
let loading: ILoadingInstance;
/**
 * 开始加载
 */
const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgb(255, 255, 255, 0)'
  });
};
/**
 * 结束加载
 */
const endLoading = () => {
  loading.close();
};
/**
 * 请求地址
 */
let BASE_URL = import.meta.env.VITE_BASE_HTTP;
let mode = import.meta.env.MODE;
const arr = mode.split('.');
if (arr[1]) {
  BASE_URL = `${BASE_URL}/${arr[0]}`;
}
/**
 * 创建 Axios 实例
 */
const net = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5
});
/**
 * 设置请求拦截器
 */
net.interceptors.request.use((req: AxiosRequestConfig) => {
  startLoading();
  return req;
}, (error) => {
  console.error(error);
  ElMessage.error(error);
  return Promise.reject(error);
});

enum Status {
  TOKEN_NO_USE = -1,
  OK = 0
};

interface ResponseObj {
  status: number;
  data: any;
  msg: string;
};

/**
 * 设置响应拦截器
 */
net.interceptors.response.use((response: AxiosResponse<ResponseObj>) => {
  endLoading();
  const res = response.data;
  if (res.status === Status.OK) {
    return res.data;
  } else if (res.status === Status.TOKEN_NO_USE) {
    ElMessageBox.confirm('登录信息过期，请重新登录！', '提示', {
      showCancelButton: false,
      type: 'warning'
    }).catch(() => null).finally(() => {
      removeToken();
      location.href='/#/login';
    });
  } else {
    const ErrMsg = res.msg;
    ElMessage.error(ErrMsg);
    throw new Error(ErrMsg);
  }
}, (error: Error) => {
  endLoading();
  console.error(error);
  ElMessage.error(error.message);
  throw new Error(error.message);
});

export default net;
