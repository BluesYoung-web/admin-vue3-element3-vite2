/*
 * @Author: zhangyang
 * @Date: 2021-03-01 09:31:21
 * @LastEditTime: 2021-03-01 14:54:21
 * @Description: 角色相关的数据结构定义
 */
interface Role {
  autoid: number;
  is_enable: number;
  parent_role_id: number;
  platform_type: number;
  role_desc: string;
  role_name: string;
  role_access?: string;
}

interface PriorityItem extends NavArrItem {
  is_checked: number | boolean;
  part: PriorityItem[];
}

interface RolePriorityObj extends Role {
  nodeList: PriorityItem[]
}