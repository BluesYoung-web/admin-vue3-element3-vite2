/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:06:59
 * @LastEditTime: 2021-03-02 08:40:24
 * @Description: 前端路由
 */
import { createRouter, createWebHashHistory } from 'vue-router';

import commonRoute from './common/index';

import Layout from '/src/layout/index.vue';


export const routes = [
  ...commonRoute,
  {
    path: '/',
    component: Layout,
    redirect: '/myMatch/apply',
    name: 'default'
  },
  {
    path: '/myMatch',
    component: Layout,
    redirect: '/myMatch',
    name: 'myMatch',
    // ---- 商户 | 管理员 可执行 ----
    children: [
      {
        path: '/myMatch/apply',
        name: 'apply',
        component: () => import('/src/views/myMatch/apply.vue'),
        meta: { title: '赛事申请' }
      },
      {
        path: '/myMatch/list',
        name: 'list',
        component: () => import('/src/views/myMatch/list.vue'),
        meta: { title: '赛事列表' }
      }
    ]
  },
  {
    path: '/matchAudit',
    component: Layout,
    redirect: '/matchAudit',
    name: 'matchAudit',
    // ---- 仅管理员 可执行 ----
    children: [
      {
        path: '/matchAudit/audit',
        name: 'audit',
        component: () => import('/src/views/matchAudit/audit.vue'),
        meta: { title: '审核列表' }
      },
      {
        path: '/matchAudit/exchange',
        name: 'exchange',
        component: () => import('/src/views/matchAudit/exchange.vue'),
        meta: { title: '兑换记录查询' }
      },
      {
        path: '/matchAudit/flow',
        name: 'flow',
        component: () => import('/src/views/matchAudit/flow.vue'),
        meta: { title: '流水查询' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'system',
    // ---- 仅管理员 可执行 ----
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
  },
  // 页面不存在，重定向到 404,必须放在最后！！！
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;