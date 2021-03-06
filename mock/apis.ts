/*
 * @Author: zhangyang
 * @Date: 2021-03-09 17:50:01
 * @LastEditTime: 2021-03-10 10:55:37
 * @Description: 所有假接口
 */
import Mock from 'mockjs';

export const operate = (params: Map<string, any>, body: any) => {
  let data = null;
  switch (+params.get('task')) {
    case 1:
      data = Mock.mock({
        'admin_id|1-99': 99,
        'token': /(\d|\w){32}/
      });
      break;
    case 3:
      data = Mock.mock({
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
            autoid: 3,
            is_show: 1,
            node_desc: '仅管理员可见',
            node_name: '系统后台',
            node_path: '',
            node_sort: 0,
            node_type: 1,
            parent_id: 0,
            part: [
              {
                autoid: 31,
                is_show: 1,
                node_desc: '节点列表',
                node_name: '节点列表',
                node_path: '10086/31',
                node_sort: 0,
                node_type: 2,
                parent_id: 3,
                part: []
              },
              {
                autoid: 32,
                is_show: 1,
                node_desc: '角色列表',
                node_name: '角色列表',
                node_path: '10086/32',
                node_sort: 0,
                node_type: 2,
                parent_id: 3,
                part: []
              }
            ]
          },
          {
            autoid: 1,
            is_show: 1,
            node_desc: '商户/管理员可见',
            node_name: '常用组件',
            node_path: '',
            node_sort: 0,
            node_type: 1,
            parent_id: 0,
            part: [
              {
                autoid: 11,
                is_show: 1,
                node_desc: '表格组件',
                node_name: '表格组件',
                node_path: '10086/13',
                node_sort: 0,
                node_type: 2,
                parent_id: 1,
                part: []
              },
              {
                autoid: 12,
                is_show: 1,
                node_desc: '图片上传组件',
                node_name: '图片上传组件',
                node_path: '10086/11',
                node_sort: 0,
                node_type: 2,
                parent_id: 1,
                part: []
              },
              {
                autoid: 12,
                is_show: 1,
                node_desc: '富文本编辑器',
                node_name: '富文本编辑器',
                node_path: '10086/12',
                node_sort: 0,
                node_type: 2,
                parent_id: 1,
                part: []
              }
            ]
          }
        ]
      });
      break;
    case 10:
      data = Mock.mock([
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
      break;
    case 14:
      data = Mock.mock({
        'data|6-10': [
          {
            'autoid|1-99': 99,
            'is_enable|0-1': 1,
            'parent_role_id': 0,
            'platform_type|0-1': 0,
            'role_desc': Mock.Random.cword(3, 5),
            'role_name': Mock.Random.cname()
          }
        ]
      }).data;
      break;
    case 15:
      data = Mock.mock({
        'autoid|1-99': 99,
        'is_enable|0-1': 1,
        'parent_role_id': 0,
        'platform_type|0-1': 0,
        'role_desc': Mock.Random.cword(3, 5),
        'role_name': Mock.Random.cname(),
        'nodeList': Mock.mock([
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
      })
      break;
    default:
      data = {};
      break;
  }
  return data;
}