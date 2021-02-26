<!--
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-02-25 15:06:09
 * @Description: 项目说明
-->
# 中传新文创赛事平台

## 权限管理

- 所有用户必须登录
- 前端根据用户身份动态显示页面
- 商户登录之后可以进行赛事申请以及查看自己的赛事列表
- 管理员登录之后在商户的基础上拥有审核列表、兑换记录查询、流水查询...

```bash
# 装依赖
yarn
# 本地运行
yarn dev
# 打包
yarn build
# 本地预览打包后的页面
yarn pre
```
## 项目说明

- 本项目是基于 Vue-Element-Admin 样式的 Vue3 版本重构，省略了 Mock 与 测试代码
- 主用技术栈：Vue3 Element-Plus TypeScript
- 此版本为 admin-vue3-element3 的改进版：
  - [x] 采用全新的 vite2.0
  - [x] 加入了 polyfill
  - [ ] 加入了 svg 图标组件
