/*
 * @Author: zhangyang
 * @Date: 2021-03-01 09:31:21
 * @LastEditTime: 2021-07-12 12:08:35
 * @Description: 角色相关的数据结构定义
 */
interface Role {
  autoid: number;
  is_enable: number;
  parent_role_id: number;
  role_desc: string;
  role_name: string;
  role_access?: string;
}

interface PriorityItem extends NavArrItem {
  is_checked: 0 | 1;
  part: PriorityItem[];
}

interface RolePriorityObj {
  info: Role;
  list: PriorityItem[];
}

interface UserKey {
  aid: number;
  token: string;
}
