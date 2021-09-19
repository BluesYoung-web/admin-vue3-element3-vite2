/*
 * @Author: zhangyang
 * @Date: 2021-08-26 15:34:41
 * @LastEditTime: 2021-09-19 15:51:28
 * @Description: 登录相关
 */
import { MockApi } from "../decorator/MockApi";
import Mock from 'mockjs';
export class LoginController {
  @MockApi('10000/1')
  static login(params: Record<string, any>) {
    // console.log(params);
    const data = Mock.mock({
      'aid|1-99': 99,
      'token': /(\d|\w){32}/
    });
    return { status: 0, data, msg: 'ok'};
  }

  @MockApi('10000/2') // 退出登录
  @MockApi('10000/4') // 修改密码
  // 通用操作成功
  static common_success(params: Record<string, any>) {
    return { status: 0, data: {}, msg: 'ok'};
  }

  @MockApi('10000/3')
  static getUserInfo(params: Record<string, any>) {
    const data = Mock.mock({
      'admin_name': Mock.Random.word(),
      'real_name': Mock.Random.cname(),
      'autoid|1-99': 99,
      'create_time': Mock.Random.date('yyyy/MM/dd HH:mm:ss'),
      'last_time': Mock.Random.date('yyyy/MM/dd HH:mm:ss'),
      'login_time': Mock.Random.date('yyyy/MM/dd HH:mm:ss'),
      'login_ip': Mock.Random.ip(),
      'is_enable': 1,
      'phone_number': /^1[0-9]{10}$/,
      'role_id': [1],
      'role_name': '超级管理员',
      'menuBar': [
        {
          autoid: 1,
          is_show: 1,
          node_desc: '',
          node_name: '系统后台',
          node_path: '',
          node_sort: 0,
          node_type: 1,
          parent_id: 0,
          part: [
            {
              autoid: 11,
              is_show: 1,
              node_desc: '节点列表',
              node_name: '节点列表',
              node_path: '10000/5',
              node_sort: 0,
              node_type: 2,
              parent_id: 1,
              part: []
            },
            {
              autoid: 12,
              is_show: 1,
              node_desc: '角色列表',
              node_name: '角色列表',
              node_path: '10000/8',
              node_sort: 0,
              node_type: 2,
              parent_id: 1,
              part: []
            },
            {
              autoid: 13,
              is_show: 1,
              node_desc: '管理员列表',
              node_name: '管理员列表',
              node_path: '10000/12',
              node_sort: 0,
              node_type: 2,
              parent_id: 1,
              part: []
            }
          ]
        },
        {
          autoid: 2,
          is_show: 1,
          node_desc: '',
          node_name: '常用组件',
          node_path: '',
          node_sort: 0,
          node_type: 1,
          parent_id: 0,
          part: [
            {
              autoid: 21,
              is_show: 1,
              node_desc: '表格组件',
              node_name: '表格组件',
              node_path: '10000/16',
              node_sort: 0,
              node_type: 2,
              parent_id: 2,
              part: []
            },
            {
              autoid: 24,
              is_show: 1,
              node_desc: 'tab组件',
              node_name: 'tab组件',
              node_path: '10000/17',
              node_sort: 0,
              node_type: 2,
              parent_id: 2,
              part: []
            },
            {
              autoid: 22,
              is_show: 1,
              node_desc: '图片上传组件',
              node_name: '图片上传组件',
              node_path: '10000/18',
              node_sort: 0,
              node_type: 2,
              parent_id: 2,
              part: []
            },
            {
              autoid: 23,
              is_show: 1,
              node_desc: '富文本编辑器',
              node_name: '富文本编辑器',
              node_path: '10000/19',
              node_sort: 0,
              node_type: 2,
              parent_id: 2,
              part: []
            },
            {
              autoid: 24,
              is_show: 1,
              node_desc: '滑块验证',
              node_name: '滑块验证',
              node_path: '10000/22',
              node_sort: 0,
              node_type: 2,
              parent_id: 2,
              part: []
            }
          ]
        },
        {
          autoid: 3,
          is_show: 1,
          node_desc: '',
          node_name: 'VueUse使用示例',
          node_path: '',
          node_sort: 0,
          node_type: 1,
          parent_id: 0,
          part: [
            {
              autoid: 31,
              is_show: 1,
              node_desc: '',
              node_name: 'useEventListener',
              node_path: '10000/20',
              node_sort: 0,
              node_type: 2,
              parent_id: 3,
              part: []
            }
          ]
        },
        {
          autoid: 4,
          is_show: 0,
          node_desc: '测试',
          node_name: '自动创建测试',
          node_path: '',
          node_sort: 0,
          node_type: 1,
          parent_id: 0,
          part: [
            {
              autoid: 41,
              is_show: 1,
              node_desc: '自动创建测试',
              node_name: '自动创建测试',
              node_path: '10000/21',
              node_sort: 0,
              node_type: 2,
              parent_id: 4,
              part: []
            }
          ]
        }
      ]
    });
    return { status: 0, data, msg: 'ok'};
  }
}
