/*
 * @Author: zhangyang
 * @Date: 2021-02-25 17:05:01
 * @LastEditTime: 2021-02-26 11:49:06
 * @Description: 前端路由鉴权
 */
/**
 * 路由映射表
 */
const navMap = new Map();
// 商户 + 管理员
navMap.set('10086/11', '/myMatch/apply');
navMap.set('10086/12', '/myMatch/list');
// 仅管理员
navMap.set('10086/21', '/matchAudit/audit');
navMap.set('10086/22', '/matchAudit/exchange');
navMap.set('10086/23', '/matchAudit/flow');
navMap.set('10086/31', '/system/node');
navMap.set('10086/32', '/system/role');
navMap.set('10086/33', '/system/admin');
/**
 * 获取真实路由
 */
const getUrl = (node_path: string): string => navMap.get(node_path) || node_path;

export {
  getUrl
}