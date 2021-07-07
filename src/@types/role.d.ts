/*
 * @Author: zhangyang
 * @Date: 2021-03-01 09:31:21
 * @LastEditTime: 2021-07-07 11:29:16
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

interface RolePriorityObj extends Role {
  nodeList: PriorityItem[]
}

interface UserKey {
  admin_id: number;
  token: string;
}
