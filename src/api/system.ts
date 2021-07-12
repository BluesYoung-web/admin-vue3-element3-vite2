/*
 * @Author: zhangyang
 * @Date: 2021-02-26 13:54:37
 * @LastEditTime: 2021-07-12 17:27:57
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
    return item;
  });
  return { list, total };
};

/**
 * 删除 | 启用 | 禁用 管理员
 */
type state = 0 | 1;
const changeAdminState = async ({ admin_id, oper, is_enable }:{ admin_id: number; oper: state; is_enable: state; }) => {
  const task = 17;
  const params = {
    com: Params.com,
    task,
    admin_id,
    oper,
    is_enable
  };

  return await basicRequest(params);
};

/**
 * 获取管理员详情
 */
const getAdminInfo = async (admin_id: number) => {
  const task = 14;
  const params = {
    com: Params.com,
    task,
    admin_id
  };

  const res = await basicRequest(params);
  const { info = {}, role_list = {} } = res as unknown as any;

  const temp_info = {
    admin_id: info.autoid,
    name: info.admin_name,
    pwd: info.admin_password || '',
    phone: info.phone_number,
    real_name: info.real_name,
    is_enable: info.is_enable,
    role: []
  };

  return { info: temp_info, role_list: Object.values(role_list) };
};
/**
 * 添加管理员
 */
const addAdminUserInfo = async (info: any, task:number = 15) => {
  const params = {
    com: Params.com,
    task,
    ...info,
    role: info.role.join(',')
  };

  return await basicRequest(params);
};

/**
 * 编辑管理员
 */
const editAdminUserInfo = async (info: any, task: number = 16) => {
  addAdminUserInfo(info, task);
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
