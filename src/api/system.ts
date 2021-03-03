/*
 * @Author: zhangyang
 * @Date: 2021-02-26 13:54:37
 * @LastEditTime: 2021-03-01 14:14:28
 * @Description: 系统相关的请求
 */
import { basicRequest } from '../util/request';

enum Params {
  com = 10000
};

/**
 * 获取节点列表
 */
const getNodeList = async () =>{
  const task = 10;
  const params = { com: Params.com, task };

  return await basicRequest(params);
};

/**
 * 添加节点
 */
const addNode = async (nodeItem: AddNodeItem) => {
  const task = 11;
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
  const task = 12;
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
  const task = 13;
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
  const task = 14;
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
  const task = 15;
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
  const task = 16;
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
  const task = 17;
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
  const task = 18;
  const params = {
    com: Params.com,
    task,
    role_id,
    oper: 0
  };

  return await basicRequest(params);
}

export {
  getNodeList,
  addNode,
  editNode,
  delNode,
  getRoleList,
  getRolePriorityList,
  addRole,
  editRole,
  delRole
}