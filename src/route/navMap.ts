/*
 * @Author: zhangyang
 * @Date: 2021-02-25 17:05:01
 * @LastEditTime: 2021-05-29 16:48:18
 * @Description: 前端路由鉴权
 */
/**
 * 路由映射表
 */
const navMap = new Map();
/**
 * 自定义组件
 */
navMap.set('10086/11', '/myComponents/imgUpload');
navMap.set('10086/12', '/myComponents/richTextEditor');
navMap.set('10086/13', '/myComponents/table');
navMap.set('10086/14', '/myComponents/tab');
/**
 * VueUse 使用示例
 */
navMap.set('10086/21', '/vueUse/useEventListener');
/**
 * 系统节点
 */
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
