<!--
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-04-01 17:24:29
 * @Description: 项目说明
-->
# 后台管理系统

## 权限管理

- 所有用户必须登录
- 后端权限管理 + 前端权限管理

```bash
# 装依赖
yarn
# 本地运行(请求真实开发服服务器)
yarn dev
# 本地运行(使用 mock，账号密码随便填)
yarn dev:mock
# 本地运行(请求测试服务器)
yarn dev:test
# 本地运行(请求正式服务器)
yarn dev:prod
# 打mock包
yarn build:mock
# 打开发服包
yarn build:dev
# 打测试服包
yarn build:test
# 打正式服包
yarn build:prod
# 本地预览打包后的页面
yarn pre
```
## 项目说明

- [在线预览](https://bluseyoung-web.gitee.io/admin-vue3-element3-vite2)
- 本项目是基于 Vue-Element-Admin 样式的 Vue3 版本重构，省略了测试代码
- 主用技术栈：Vue3 Element-Plus TypeScript
- 此版本为 admin-vue3-element3 的改进版：
  - [x] 采用全新的 vite2.0
  - [x] 加入了 polyfill
  - [x] 防抖与节流的自定义指令
  - [x] 二次封装常用组件
    - 表格
    - 右键菜单
    - 弹出层
    - 富文本编辑器
    - 分页
    - tab
    - svg
    - ...
