/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:06:59
 * @LastEditTime: 2021-07-22 16:32:47
 * @Description: 前端路由
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import pages from './pages.json';
import commonRoute from './common/index';

import Layout from '/src/layout/index.vue';

const routes: RouteRecordRaw[] = [
  // 通用路由，无权限
  ...commonRoute,
  // 进入后台之后的默认界面
  {
    path: '/',
    component: Layout,
    redirect: '/Dashboard/dashboard'
  },
  {
    path: '/Dashboard',
    component: Layout,
    redirect: '/Dashboard/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('/src/views/dashboard/index.vue'),
        meta: { title: '欢迎使用' }
      }
    ]
  }
];
/**
 * 根据约定的配置文件生成路由
 */
for (const path of Object.keys(pages)) {
  const _conf = (pages as unknown as any)[path] as { name: string; title: string; }[];
  const routeItem: RouteRecordRaw = {
    path: `/${path}`,
    component: Layout,
    redirect: `/${path}/${_conf[0].name}`,
    name: path,
    children: []
  };
  for (const { name, title } of _conf) {
    routeItem.children?.push({
      path: name,
      name,
      // 动态生成的导入名称必须为相对路径，而且必须有扩展名
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      component: () => import(`../views/${path}/${name}.vue`),
      meta: { title }
    });
  }
  routes.push(routeItem);
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
