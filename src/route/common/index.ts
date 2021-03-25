/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:58:35
 * @LastEditTime: 2021-03-24 18:00:26
 * @Description: 通用路由
 */
const route = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/Dashboard/dashboard',
    name: 'dashboard',
    component: () => import('/src/views/dashboard/index.vue'),
    meta: { title: '欢迎使用' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/src/views/404.vue')
  }
]

export default route;
