/*
 * @Author: zhangyang
 * @Date: 2020-12-08 11:15:26
 * @LastEditTime: 2021-07-10 19:53:40
 * @Description: 用户身份认证 Cookie
 */
import { get, set, remove } from 'js-cookie';

const TONKEN_KEY = 'www.bluesyoung-web.top';

/**
 * 获取 Token
 */
const getToken = () => {
  const token = get(TONKEN_KEY) || '{}'
  return JSON.parse(token);
};

/**
 * 设置 Token
 * @param key 后端返回的用户信息
 */
const setToken = (key: UserKey) => {
  return set(TONKEN_KEY, key);
};
/**
 * 删除 Token，退出登录
 */
const removeToken = () => {
  return remove(TONKEN_KEY);
};

export {
  getToken,
  setToken,
  removeToken
}
