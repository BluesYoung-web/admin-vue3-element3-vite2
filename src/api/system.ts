/*
 * @Author: zhangyang
 * @Date: 2021-02-26 13:54:37
 * @LastEditTime: 2021-07-13 10:56:36
 * @Description: 系统相关的请求
 */
import { basicRequest } from '../util/request';
import { Params } from './_config';
import moment from 'moment';

/**
 * 获取节点列表
 */
const getNodeList = async () =>{
  const task = 5;
  const params = { com: Params.com, task };

  return await basicRequest(params);
};

/**
 * 添加节点
 */
const addNode = async (nodeItem: AddNodeItem, task = 6) => {
  const params = { com: Params.com, task, ...nodeItem };
  params.node_path = encodeURI(params.node_path);

  return await basicRequest(params);
};

/**
 * 编辑节点
 */
const editNode = async (nodeItem: EditNodeItem) => {
  return await addNode(nodeItem);
};

/**
 * 删除节点
 */
const delNode = async (node_id: number) => {
  const task = 7;
  const params = { com: Params.com, task, node_id };

  return await basicRequest(params);
};

/**
 * 获取角色列表
 */
const getRoleList = async () => {
  const task = 8;
  const params = { com: Params.com, task };

  return await basicRequest(params);
};

/**
 * 添加角色
 */
const addRole = async (role: Role, task = 9) => {
  const params = { com: Params.com, task, ...role };
  return await basicRequest(params);
};

/**
 * 编辑角色
 */
const editRole = async (role: Role) => {
  return await addRole(role);
};

/**
 * 删除角色
 */
const delRole = async (role_id: number) => {
  const task = 10;
  const params = { com: Params.com, task, role_id };
  return await basicRequest(params);
};

/**
 * 获取角色权限列表
 */
const getRolePriorityList = async (role_id: number) => {
  const task = 11;
  const params = { com: Params.com, task, role_id };
  return await basicRequest(params);
};
/**
 * 获取管理员列表
 */
const getAdminList = async (args: any) => {
  const task = 12;
  const params = { com: Params.com, task, ...args };

  const res = await basicRequest(params);
  const { list = [], total = 0 } = res as unknown as any;
  list.map((item: any) => {
    item.create_time = moment(item.create_time).format('YYYY-MM-DD kk:mm:ss');;
    item.name = item.admin_name;
    item.phone = item.phone_number;
    item.role = Number(item.role_id) || 1;
    item.admin_id = item.autoid;
    item.pwd = '';
    return item;
  });
  return { list, total };
};

/**
 * 获取启用状态的角色列表
 */
const getAdminInfo = async () => {
  const task = 13;
  const params = { com: Params.com, task };

  return await basicRequest(params);
};
/**
 * 添加|编辑 管理员
 */
const addAdminUserInfo = async (info: any, task = 14) => {
  const params = { com: Params.com, task, ...info };

  return await basicRequest(params);
};

/**
 * 编辑管理员
 */
const editAdminUserInfo = addAdminUserInfo;

/**
 * 删除管理员
 */
const changeAdminState = async (admin_id: number) => {
  const task = 15;
  const params = { com: Params.com, task, admin_id };

  return await basicRequest(params);
};

export {
  getNodeList,
  addNode,
  editNode,
  delNode,
  getRoleList,
  getRolePriorityList,
  addRole,
  editRole,
  delRole,
  getAdminList,
  getAdminInfo,
  addAdminUserInfo,
  editAdminUserInfo,
  changeAdminState
}
