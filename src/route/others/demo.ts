/*
 * @Author: zhangyang
 * @Date: 2021-03-24 18:02:35
 * @LastEditTime: 2021-03-25 11:52:54
 * @Description: demo 页面
 */
import Layout from '/src/layout/index.vue';

export default [
  {
    path: '/myComponents',
    component: Layout,
    redirect: '/myComponents',
    name: 'myComponents',
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
      },
      {
        path: '/myComponents/tab',
        name: 'tab',
        component: () => import('/src/views/myComponents/tab.vue'),
        meta: { title: 'Tab组件' }
      }
    ]
  }
];