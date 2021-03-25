/*
 * @Author: zhangyang
 * @Date: 2020-12-09 15:56:27
 * @LastEditTime: 2021-03-25 10:38:40
 * @Description: 用户相关的请求接口
 */
import { requestWithoutToken, basicRequest } from '../util/request';
import { Params } from './_config';

const login = async (username: string, password: string) => {
  const task = 1;
  const params = {
    com: Params.com,
    task,
    login_name: username,
    login_code: password
  };

  return await requestWithoutToken(params);
};

const login_out = async () => {
  const task = 2;
  const params = {
    com: Params.com,
    task
  };

  return await basicRequest(params);
};

const getUserInfo = async () => {
  const task = 3;
  const params = {
    com: Params.com,
    task
  };

  return await basicRequest(params);
};

const modifyPassword = async (old_pass: string, pass: string) => {
  const params = {
    com: Params.com,
    task: 18,
    old_pass,
    pass
  };

  return await basicRequest(params);
};

export {
  login,
  login_out,
  modifyPassword,
  getUserInfo
}
