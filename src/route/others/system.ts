/*
 * @Author: zhangyang
 * @Date: 2021-03-22 15:51:46
 * @LastEditTime: 2021-03-22 15:53:27
 * @Description: 系统后台相关路由
 */
import Layout from '/src/layout/index.vue';

export default [
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'system',
    children: [
      {
        path: '/system/node',
        name: 'node',
        component: () => import('/src/views/system/node.vue'),
        meta: { title: '节点列表' }
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('/src/views/system/role.vue'),
        meta: { title: '角色列表' }
      },
      {
        path: '/system/admin',
        name: 'admin',
        component: () => import('/src/views/system/admin.vue'),
        meta: { title: '管理员列表' }
      }
    ]
  }
];