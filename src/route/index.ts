/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:06:59
 * @LastEditTime: 2021-03-10 11:44:52
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
    redirect: '/myComponents/table',
    name: 'default'
  },
  {
    path: '/myComponents',
    component: Layout,
    redirect: '/myComponents',
    name: 'myComponents',
    // ---- 商户 | 管理员 可执行 ----
    children: [
      {
        path: '/myComponents/table',
        name: 'table',
        component: () => import('/src/views/myComponents/table.vue'),
        meta: { title: '表格组件' }
      },
      {
        path: '/myComponents/imgUpload',
        name: 'imgUpload',
        component: () => import('/src/views/myComponents/imgUpload.vue'),
        meta: { title: '图片上传组件' }
      },
      {
        path: '/myComponents/richTextEditor',
        name: 'richTextEditor',
        component: () => import('/src/views/myComponents/richTextEditor.vue'),
        meta: { title: '富文本编辑器' }
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
      }
    ]
  },
  // 页面不存在，404,必须放在最后！！！
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/src/views/404.vue'),
    hidden: true
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;