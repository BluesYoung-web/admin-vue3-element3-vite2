/*
 * @Author: zhangyang
 * @Date: 2021-02-25 17:25:47
 * @LastEditTime: 2021-02-26 09:51:12
 * @Description: 
 */
import { NavArrItem } from './../store/modules/nav';
/**
 * 通用导航对象
 */
const commonNavArr: NavArrItem[] = [
  {
    autoid: 1,
    is_show: 1,
    node_desc: '商户/管理员可见',
    node_name: '我的赛事',
    node_path: '',
    node_sort: 0,
    node_type: 1,
    parent_id: 0,
    part: [
      {
        autoid: 11,
        is_show: 1,
        node_desc: '赛事申请',
        node_name: '赛事申请',
        node_path: '10086/11',
        node_sort: 0,
        node_type: 2,
        parent_id: 1,
        part: []
      },
      {
        autoid: 12,
        is_show: 1,
        node_desc: '赛事列表',
        node_name: '赛事列表',
        node_path: '10086/12',
        node_sort: 0,
        node_type: 2,
        parent_id: 1,
        part: []
      }
    ]
  }
];
/**
 * 管理员导航对象
 */
const adminNavArr: NavArrItem[] = [
  ...commonNavArr,
  {
    autoid: 2,
    is_show: 1,
    node_desc: '仅管理员可见',
    node_name: '赛事审核',
    node_path: '',
    node_sort: 0,
    node_type: 1,
    parent_id: 0,
    part: [
      {
        autoid: 21,
        is_show: 1,
        node_desc: '审核列表',
        node_name: '审核列表',
        node_path: '10086/21',
        node_sort: 0,
        node_type: 2,
        parent_id: 2,
        part: []
      },
      {
        autoid: 22,
        is_show: 1,
        node_desc: '兑换记录查询',
        node_name: '兑换记录查询',
        node_path: '10086/22',
        node_sort: 0,
        node_type: 2,
        parent_id: 2,
        part: []
      },
      {
        autoid: 23,
        is_show: 1,
        node_desc: '流水查询',
        node_name: '流水查询',
        node_path: '10086/23',
        node_sort: 0,
        node_type: 2,
        parent_id: 2,
        part: []
      }
    ]
  }
];

export {
  commonNavArr,
  adminNavArr
};
