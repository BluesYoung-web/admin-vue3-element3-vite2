/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-07-05 12:09:28
 * @Description: 项目入口文件
 */

// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 引入 windicss 的样式
// 不引入 windi-base 是为了防止影响现有的样式，引入另外的两个是保证 windicss 可以正常使用
// import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
//  引入 Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 引入中文资源(默认英文)
// vite 警告，将后面引号的内容加入 vite.config.js 的 optimizeDeps 的 include 里面可解决
import locale from 'element-plus/lib/locale/lang/zh-cn';
import useMock from '../mock/index';
// 引入 VueRouter
import Router from './route/index';
// 引入路由导航守卫
import './permission';
import { getToken } from './util/auth';
import { generateUserInfo } from './util/generateUserInfo';

// 注册 svg icons
import 'vite-plugin-svg-icons/register';
// 统一浏览器样式
import 'normalize.css/normalize.css';
// 自定义样式
import '@/styles/index.scss';
// 常用的自定义组件
import YoungTable from '/components/YoungTable/index.vue';
import YoungPagination from '/components/YoungPagination/index.vue';
import YoungDialog from '/components/YoungDialog/index.vue';
import YoungTabs from '/src/components/YoungTabs/index.vue';

import { createApp } from 'vue';
import App from './App.vue';

// 引入自定义插件
import MyPlugins from './plugins/index';

// 刷新页面的时候，如果存在 token 就直接获取导航栏列表
if (getToken().token) {
  generateUserInfo();
}

if (import.meta.env.MODE === 'mock') {
  useMock();
}

// 创建应用实例
const app = createApp(App);
// 使用 Element Plus，启用中文资源，全局默认小图标
app.use(ElementPlus, { locale, size: 'mini' });
// 使用路由
app.use(Router);

// 注册自定义组件
app.component('YoungTable', YoungTable);
app.component('YoungDialog', YoungDialog);
app.component('YoungPagination', YoungPagination);
app.component('YoungTabs', YoungTabs);

// 安装自定义插件
app.use(MyPlugins, '来了老弟');

// 挂载应用
app.mount('#app');
