/*
 * @Author: zhangyang
 * @Date: 2021-02-25 17:05:01
 * @LastEditTime: 2021-09-29 11:34:34
 * @Description: 前端路由鉴权
 */
/**
 * 路由映射表
 */
const navMap = new Map<string, string>();
/**
 * 自定义组件
 */
navMap.set('10000/16', '/myComponents/table');
navMap.set('10000/17', '/myComponents/tab');
navMap.set('10000/18', '/myComponents/imgUpload');
navMap.set('10000/19', '/myComponents/richTextEditor');
navMap.set('10000/22', '/myComponents/slide-verify');
navMap.set('10000/24', '/myComponents/formTest');
/**
 * VueUse 使用示例
 */
navMap.set('10000/20', '/vueUse/useEventListener');
navMap.set('10000/23', '/vueUse/useClipboard');
/**
 * 系统节点
 */
navMap.set('10000/5', '/system/node');
navMap.set('10000/8', '/system/role');
navMap.set('10000/12', '/system/admin');
/**
 * 测试
 */
navMap.set('10000/21', '/autoTest/test01');
/**
 * 获取真实路由
 */
export const getUrl = (node_path: string): string => navMap.get(node_path) || node_path;
