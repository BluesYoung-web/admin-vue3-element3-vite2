/*
 * @Author: zhangyang
 * @Date: 2021-02-26 13:54:37
 * @LastEditTime: 2021-03-25 11:45:31
 * @Description: 系统相关的请求
 */
import { basicRequest } from '../util/request';
import { formatDate } from '../util/timeFormat';
import { Params } from './_config';

/**
 * 获取节点列表
 */
const getNodeList = async () =>{
  const task = 4;
  const params = { com: Params.com, task };

  return await basicRequest(params);
};

/**
 * 添加节点
 */
const addNode = async (nodeItem: AddNodeItem) => {
  const task = 5;
  const params = {
    com: Params.com,
    task,
    ...nodeItem
  };

  return await basicRequest(params);
};

/**
 * 编辑节点
 */
const editNode = async (nodeItem: EditNodeItem) => {
  const task = 6;
  const params = {
    com: Params.com,
    task,
    ...nodeItem
  };

  return await basicRequest(params);
};

/**
 * 删除节点
 */
const delNode = async (node_id: number) => {
  const task = 7;
  const params = {
    com: Params.com,
    task,
    node_id
  };

  return await basicRequest(params);
};

/**
 * 获取角色列表
 */
const getRoleList = async () => {
  const task = 8;
  const params = {
    com: Params.com,
    task
  };

  return await basicRequest(params);
};

/**
 * 获取角色权限列表
 */
const getRolePriorityList = async (role_id: number) => {
  const task = 9;
  const params = {
    com: Params.com,
    task,
    role_id
  };

  return await basicRequest(params);
};

/**
 * 添加角色
 */
const addRole = async (role: Role) => {
  const task = 10;
  const params = {
    com: Params.com,
    task,
    ...role
  };

  return await basicRequest(params);
};

/**
 * 编辑角色
 */
const editRole = async (role: Role) => {
  const task = 11;
  const params = {
    com: Params.com,
    task,
    role_id: role.autoid,
    ...role
  };

  return await basicRequest(params);
};

/**
 * 删除角色
 */
const delRole = async (role_id: number) => {
  const task = 12;
  const params = {
    com: Params.com,
    task,
    role_id,
    oper: 0
  };

  return await basicRequest(params);
};

/**
 * 获取管理员列表
 */
const getAdminList = async (args: any) => {
  const task = 13;
  const params = {
    com: Params.com,
    task,
    ...args
  };

  const res = await basicRequest(params);
  const { list = [], total = 0 } = res as unknown as any;
  list.map((item: any) => {
    item.create_time = formatDate(item.create_time * 1000, 'Y/M/D h:m:s');
    item.last_time = formatDate(item.last_time * 1000, 'Y/M/D h:m:s');
    item.login_time = formatDate(item.login_time * 1000, 'Y/M/D h:m:s');
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
export interface UserInfo {
  admin_id: number;
  name: string;
  pwd: string;
  phone: string;
  real_name: string;
  role: number[];
  is_enable: 0 | 1;
}
/**
 * 添加管理员
 */
const addAdminUserInfo = async (info: UserInfo, task:number = 15) => {
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
const editAdminUserInfo = async (info: UserInfo, task: number = 16) => {
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