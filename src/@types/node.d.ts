/*
 * @Author: zhangyang
 * @Date: 2021-02-26 14:44:22
 * @LastEditTime: 2021-02-26 17:43:13
 * @Description: 节点相关的数据结构定义
 */
declare enum SHOW_STATE {
  NOT_SHOW,
  SHOW
}
interface NavArrItem {
  /**
   * 节点唯一 id，自增
   */
  autoid: number;
  /**
   * 是否节点显示
   * 0-不显示，1-显示
   */
  is_show: SHOW_STATE;
  /**
   * 节点描述
   */
  node_desc: string;
  /**
   * 节点名称
   */
  node_name: string;
  /**
   * 节点路径
   */
  node_path: string;
  /**
   * 节点排序标志
   */
  node_sort: number;
  /**
   * 节点层级
   */
  node_type: number;
  /**
   * 此节点父节点的唯一 id
   */
  parent_id: number;
  /**
   * 此节点下的子节点
   */
  part: NavArrItem[] | [];
  /**
   * 图标名称
   */
  icon?: string;
}

interface AddNodeItem {
  autoid?: number;
  node_id?: number;
  node_name: string;
  node_desc: string;
  node_path: string;
  node_sort: number;
  is_show: number;
  parent_id: number;
}

interface EditNodeItem extends AddNodeItem {
  autoid: number;
  node_id: number;
}