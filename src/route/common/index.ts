import router from '..'

/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:58:35
 * @LastEditTime: 2021-03-01 17:34:35
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
    path: '/404',
    name: '404',
    component: () => import('/src/views/404.vue')
  }
]

export default route;
