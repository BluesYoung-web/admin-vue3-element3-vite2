/*
 * @Author: zhangyang
 * @Date: 2020-12-08 11:26:10
 * @LastEditTime: 2021-04-06 11:39:48
 * @Description: HTTP 网络请求模块
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';
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
let BASE_URL = import.meta.env.VITE_BASE_HTTP as string;
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
  OK
}

interface ResponseObj {
  status: number;
  data: any;
  msg: string;
}

/**
 * 设置响应拦截器
 */
net.interceptors.response.use((response: AxiosResponse<any>) => {
  endLoading();
  const res = response.data;
  if ((res as ResponseObj).status === Status.OK) {
    return (res as ResponseObj).data;
  } else if ((res as ResponseObj).status === Status.TOKEN_NO_USE) {
    ElMessageBox.confirm('登录信息过期，请重新登录！', '提示', {
      showCancelButton: false,
      type: 'warning'
    }).catch(() => null).finally(() => {
      removeToken();
      location.href='/#/login'
    });
  } else {
    const ErrMsg = (res as ResponseObj).msg;
    console.error(ErrMsg);
    ElMessage.error(ErrMsg);
    return Promise.reject(ErrMsg);
  }
}, (error) => {
  endLoading();
  console.error(error);
  ElMessage.error(error);
});

export default net;