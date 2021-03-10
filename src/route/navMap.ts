/*
 * @Author: zhangyang
 * @Date: 2021-02-25 17:05:01
 * @LastEditTime: 2021-03-10 11:44:12
 * @Description: 前端路由鉴权
 */
/**
 * 路由映射表
 */
const navMap = new Map();
// 商户 + 管理员
navMap.set('10086/11', '/myComponents/imgUpload');
navMap.set('10086/12', '/myComponents/richTextEditor');
navMap.set('10086/13', '/myComponents/table');
// 仅管理员
navMap.set('10086/31', '/system/node');
navMap.set('10086/32', '/system/role');
/**
 * 获取真实路由
 */
const getUrl = (node_path: string): string => navMap.get(node_path) || node_path;

export {
  getUrl
}