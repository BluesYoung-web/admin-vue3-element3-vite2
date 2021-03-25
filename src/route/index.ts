/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:06:59
 * @LastEditTime: 2021-03-24 18:05:02
 * @Description: 前端路由
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import commonRoute from './common/index';

import Layout from '/src/layout/index.vue';

const routes: RouteRecordRaw[] = [
  ...commonRoute,
  {
    path: '/',
    component: Layout,
    redirect: '/Dashboard/dashboard',
    name: 'default'
  },
  {
    path: '/Dashboard',
    component: Layout,
    redirect: '/Dashboard',
    name: 'dashboard',
    children: [
      {
        path: '/Dashboard/dashboard',
        name: 'dashboard',
        component: () => import('/src/views/dashboard/index.vue'),
        meta: { title: '欢迎使用' }
      }
    ]
  }
];

const others = import.meta.globEager('./others/*.ts');
for (const rts of Object.values(others)) {
  routes.push(...rts.default);
}
// 页面不存在，404,必须放在最后！！！
routes.push(
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/src/views/404.vue'),
    // @ts-ignore
    hidden: true
  }
);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
export { routes };