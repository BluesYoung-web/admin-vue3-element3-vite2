/*
 * @Author: zhangyang
 * @Date: 2021-08-26 16:34:59
 * @LastEditTime: 2021-08-26 16:42:40
 * @Description: 系统管理相关
 */
import { MockApi } from "../decorator/MockApi";
import Mock from 'mockjs';
export class SystemController {
  @MockApi('10000/5')
  static getNodeList(params: Record<string, any>) {
    const data = Mock.mock([
      {
        'autoid': 1,
        'is_show': 1,
        'node_desc': Mock.Random.cword(3, 8),
        'node_name': Mock.Random.cword(4, 6),
        'node_path': '',
        'node_sort': 0,
        'node_type': 1,
        'parent_id': 0,
        'part': [
          {
            'autoid': 11,
            'is_show|0-1': 1,
            'node_desc': Mock.Random.cword(3, 8),
            'node_name': Mock.Random.cword(4, 6),
            'node_path': '',
            'node_sort': 0,
            'node_type': 2,
            'parent_id': 1,
            'part|2-5': [
              {
                'autoid|1-99': 99,
                'is_show|0-1': 1,
                'node_desc': Mock.Random.cword(3, 8),
                'node_name': Mock.Random.cword(4, 6),
                'node_path': `10086/${Mock.Random.id().substr(0,3)}`,
                'node_sort': 0,
                'node_type': 3,
                'parent_id': 11,
              }
            ]
          }
        ]
      },
      {
        'autoid': 2,
        'is_show': 1,
        'node_desc': Mock.Random.cword(3, 8),
        'node_name': Mock.Random.cword(4, 6),
        'node_path': '',
        'node_sort': 0,
        'node_type': 1,
        'parent_id': 0,
        'part': [
          {
            'autoid': 21,
            'is_show|0-1': 1,
            'node_desc': Mock.Random.cword(3, 8),
            'node_name': Mock.Random.cword(4, 6),
            'node_path': '',
            'node_sort': 0,
            'node_type': 2,
            'parent_id': 2,
            'part|2-5': [
              {
                'autoid|0-99': 99,
                'is_show|0-1': 1,
                'node_desc': Mock.Random.cword(3, 8),
                'node_name': Mock.Random.cword(4, 6),
                'node_path': `10086/${Mock.Random.id().substr(0, 3)}`,
                'node_sort': 0,
                'node_type': 3,
                'parent_id': 21,
              }
            ]
          }
        ]
      },
      {
        'autoid': 3,
        'is_show': 1,
        'node_desc': Mock.Random.cword(3, 8),
        'node_name': Mock.Random.cword(4, 6),
        'node_path': '',
        'node_sort': 0,
        'node_type': 1,
        'parent_id': 0,
        'part': [
          {
            'autoid': 31,
            'is_show|0-1': 1,
            'node_desc': Mock.Random.cword(3, 8),
            'node_name': Mock.Random.cword(4, 6),
            'node_path': '',
            'node_sort': 0,
            'node_type': 2,
            'parent_id': 3,
            'part|2-5': [
              {
                'autoid|0-99': 99,
                'is_show|0-1': 1,
                'node_desc': Mock.Random.cword(3, 8),
                'node_name': Mock.Random.cword(4, 6),
                'node_path': `10086/${Mock.Random.id().substr(0, 3)}`,
                'node_sort': 0,
                'node_type': 3,
                'parent_id': 31,
              }
            ]
          }
        ]
      }
    ]);
    return { status: 0, data, msg: 'ok'};
  }

  @MockApi('10000/6') // 添加节点
  @MockApi('10000/7') // 编辑节点
  @MockApi('10000/9') // 添加 | 编辑角色
  @MockApi('10000/10') // 删除角色
  @MockApi('10000/14') // 添加 | 编辑管理员
  @MockApi('10000/15') // 删除管理员

  // 通用操作成功
  static common_success(params: Record<string, any>) {
    return { status: 0, data: {}, msg: 'ok'};
  }

  @MockApi('10000/8')
  static getRoleList(params: Record<string, any>) {
    const data = Mock.mock({
      'data|6-10': [
        {
          'autoid|1-99': 99,
          'is_enable|0-1': 1,
          'parent_role_id': 0,
          'role_desc': Mock.Random.cword(3, 5),
          'role_name': Mock.Random.cname()
        }
      ]
    }).data;
    return { status: 0, data, msg: 'ok'};
  }

  @MockApi('10000/11')
  static getRolePriorityList(params: Record<string, any>) {
    const data = Mock.mock({
      'info': {
        'autoid|1-99': 99,
        'is_enable|0-1': 1,
        'parent_role_id': 0,
        'role_desc': Mock.Random.cword(3, 5),
        'role_name': Mock.Random.cname(),
        'role_access': '1,5,8,9,6,13,14,15,7,2,3,12'
      },
      'list': Mock.mock([
        {
          'autoid': 1,
          'is_checked|0-1': 1,
          'is_show': 1,
          'node_desc': Mock.Random.cword(3, 8),
          'node_name': Mock.Random.cword(4, 6),
          'node_path': '',
          'node_sort': 0,
          'node_type': 1,
          'parent_id': 0,
          'part': [
            {
              'autoid': 11,
              'is_checked|0-1': 1,
              'is_show|0-1': 1,
              'node_desc': Mock.Random.cword(3, 8),
              'node_name': Mock.Random.cword(4, 6),
              'node_path': '',
              'node_sort': 0,
              'node_type': 2,
              'parent_id': 1,
              'part|2-5': [
                {
                  'autoid|1-99': 99,
                  'is_checked|0-1': 1,
                  'is_show|0-1': 1,
                  'node_desc': Mock.Random.cword(3, 8),
                  'node_name': Mock.Random.cword(4, 6),
                  'node_path': `10086/${Mock.Random.id().substr(0, 3)}`,
                  'node_sort': 0,
                  'node_type': 3,
                  'parent_id': 11,
                  'part': []
                }
              ]
            }
          ]
        },
        {
          'autoid': 2,
          'is_checked|0-1': 1,
          'is_show': 1,
          'node_desc': Mock.Random.cword(3, 8),
          'node_name': Mock.Random.cword(4, 6),
          'node_path': '',
          'node_sort': 0,
          'node_type': 1,
          'parent_id': 0,
          'part': [
            {
              'autoid': 21,
              'is_checked|0-1': 1,
              'is_show|0-1': 1,
              'node_desc': Mock.Random.cword(3, 8),
              'node_name': Mock.Random.cword(4, 6),
              'node_path': '',
              'node_sort': 0,
              'node_type': 2,
              'parent_id': 2,
              'part|2-5': [
                {
                  'autoid|0-99': 99,
                  'is_show|0-1': 1,
                  'is_checked|0-1': 1,
                  'node_desc': Mock.Random.cword(3, 8),
                  'node_name': Mock.Random.cword(4, 6),
                  'node_path': `10086/${Mock.Random.id().substr(0, 3)}`,
                  'node_sort': 0,
                  'node_type': 3,
                  'parent_id': 21,
                  'part': []
                }
              ]
            }
          ]
        },
        {
          'autoid': 3,
          'is_checked|0-1': 1,
          'is_show': 1,
          'node_desc': Mock.Random.cword(3, 8),
          'node_name': Mock.Random.cword(4, 6),
          'node_path': '',
          'node_sort': 0,
          'node_type': 1,
          'parent_id': 0,
          'part': [
            {
              'autoid': 31,
              'is_checked|0-1': 1,
              'is_show|0-1': 1,
              'node_desc': Mock.Random.cword(3, 8),
              'node_name': Mock.Random.cword(4, 6),
              'node_path': '',
              'node_sort': 0,
              'node_type': 2,
              'parent_id': 3,
              'part|2-5': [
                {
                  'autoid|0-99': 99,
                  'is_checked|0-1': 1,
                  'is_show|0-1': 1,
                  'node_desc': Mock.Random.cword(3, 8),
                  'node_name': Mock.Random.cword(4, 6),
                  'node_path': `10086/${Mock.Random.id().substr(0, 3)}`,
                  'node_sort': 0,
                  'node_type': 3,
                  'parent_id': 31,
                  'part': []
                }
              ]
            }
          ]
        }
      ])
    });
    return { status: 0, data, msg: 'ok'};
  }

  @MockApi('10000/12')
  static getAdminList(params: Record<string, any>) {
    const data = Mock.mock({
      'list|6-10': [
        {
          'autoid|1-99': 99,
          'is_enable|0-1': 1,
          'admin_name': Mock.Random.name(),
          'admin_password': Mock.Random.name(),
          'create_time': Math.floor(new Date().getTime() / 1000),
          'last_time': Math.floor(new Date().getTime() / 1000),
          'login_time': Math.floor(new Date().getTime() / 1000),
          'login_ip': Mock.Random.ip(),
          'phone_number': /^1[0-9]{10}$/,
          'real_name': Mock.Random.cname(),
          'role_des': Mock.Random.ctitle(),
          'extra': '透传参数测试'
        }
      ],
      'total|10-99': 10
    });
    return { status: 0, data, msg: 'ok'};
  }

  @MockApi('10000/13')
  static getAdminInfo(params: Record<string, any>) {
    const data = Mock.mock([
      {
        'autoid': 1,
        'is_enable': 1,
        'parent_role_id': 0,
        'role_desc': "超管",
        'role_name': "超级管理员",
        'platform_type|0-1': 0
      },
      {
        'autoid': 2,
        'is_enable': 1,
        'parent_role_id': 0,
        'role_desc': "产品",
        'role_name': "产品管理员",
        'platform_type|0-1': 0
      }
    ]);
    return { status: 0, data, msg: 'ok'};
  }
}
