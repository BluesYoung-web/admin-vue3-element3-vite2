/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-09-02 19:31:04
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
// to be fix 打包之后样式异常
import 'element-plus/dist/index.css';
//  引入弹框相关的样式(auto-import 只能识别 api，auto-component 只能识别 <tag />)
// import 'element-plus/theme-chalk/el-message.css';
// import 'element-plus/theme-chalk/el-message-box.css';
// 引入 VueRouter
import Router from './route/index';
// 引入路由导航守卫
import './permission';
import { getToken } from './util/auth';
import { generateUserInfo } from './util/generateUserInfo';

// 统一浏览器样式
import 'normalize.css/normalize.css';
// 自定义样式
import '@/styles/index.scss';

import { createApp } from 'vue';
import App from './App.vue';

// 引入自定义插件
import MyPlugins from './plugins/index';
// 引入 console.log 美化
// import './assets/js/console-butifull';
(async () => {
  // 刷新页面的时候，如果存在 token 就直接获取导航栏列表
  if (getToken().token) {
    generateUserInfo();
  }
})();

// 创建应用实例
const app = createApp(App);
// 使用 Element Plus 全局配置
app.config.globalProperties.$ELEMENT = { size: 'mini' };
// 使用路由
app.use(Router);
// 安装自定义插件
app.use(MyPlugins, '来了老弟');

// 挂载应用
app.mount('#app');
