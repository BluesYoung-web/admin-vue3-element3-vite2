/*
 * @Author: zhangyang
 * @Date: 2021-05-29 16:45:03
 * @LastEditTime: 2021-05-29 16:46:33
 * @Description: VueUse 相关示例的页面
 */
import Layout from '/src/layout/index.vue';

export default [
  {
    path: '/vueUse',
    component: Layout,
    redirect: '/vueUse',
    name: 'vueUse',
    children: [
      {
        path: '/vueUse/useEventListener',
        name: 'useEventListener',
        component: () => import('/src/views/vueUse/useEventListener.vue'),
        meta: { title: 'useEventListener' }
      }
    ]
  }
];
