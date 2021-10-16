<!--
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-10-16 19:57:29
 * @Description: 项目说明
-->
# 后台管理系统

## 配套后端程序

- [admin-server正在开发中...](https://gitee.com/BluesYoung-web/admin-server.git)

## 环境要求

```bash
# 本地开发      node >= 16
# 打包         node >= 12.18.1
```

## 权限管理

- 所有用户必须登录
- 后端权限管理 + 前端权限管理

## 前置条件(本地运行)

- 在项目根目录下新建 `.env.local` 文件，内容如下:

```bash
# ！！！ 变量名必须以 VITE_ 开头
# 使用 import.meta.变量名 获取

VITE_TITLE = '小黑管理后台'

# 后端使用 nginx 代理来跨域时，使用绝对路径
VITE_BASE_HTTP = '/api'
# websocket 连接地址，使用NGINX代理时为绝对路径，其他情况需要使用带协议的完整路径
VITE_BASE_WS = '/wss'

# 真实地址(树莓派内网穿透)
VITE_PI_HTTP = 'http://frp.104300.xyz:15151/api/admin'
VITE_PI_WS = 'ws://frp.104300.xyz:15151/wss/admin'
```

## 注意事项

- `yarn build`**因生产需要，将 node 运行内存设为了 1G(1024)**
- `yarn build:prod` 无内存限制

## 运行 | 打包

- 推荐使用(`yarn build | yarn build:prod | yarn build:prod.nginx`)
- 生产模式下包的体积最小(各种摇树优化)

```bash
# 装依赖
yarn
# 升级最新依赖(同时更新 yarn.lock 和 package.json)
yarn upgrade-interactive --latest
# 手动升级特定版本
yarn upgrade package-name@version

# 本地运行(请求真实开发服服务器)
yarn dev
# 本地运行(使用自定义vite插件注入的中间件实现 mock，可以在控制台看到真实的请求)
yarn dev:mock
# 本地运行(请求测试服务器)
yarn dev:test
# 本地运行(请求正式服务器)
yarn dev:prod

# ------ 本地运行及打包 ------
# --- 依赖 .env.{MODE}.local 内部的环境变量 ---
# 打mock包
yarn build:mock
# 打开发服包
yarn build:dev
# 打开发服包(后端配置了 nginx 代理，请求'/api/dev')
yarn build:dev.nginx
# 打测试服包
yarn build:test
# 打测试服包(后端配置了 nginx 代理，请求'/api/test')
yarn build:test.nginx
# 打正式服包
yarn build:prod
# 打正式服包(后端配置了 nginx 代理，请求'/api/prod')
yarn build:prod.nginx
# 本地预览打包后的页面
yarn pre

# ------ 服务器打包 ------
# 1. 注入环境变量
# VITE_BASE_HTTP = '接口请求地址(必须)'
# VITE_TITLE = '后台标题(可选)'
# 2. 打包
yarn build
```

## <span style="color: red">自动创建页面</span>

- 快捷指令 `yarn create-new-page`
- 命令行：
  - <span style="color: red">装完依赖之后，需要执行 `npm link ./bin`</span>
  - 执行完成之后可以直接在命令行输入 `create-new-page` 即可(拥有命令自动补全)

## 项目说明

- [在线预览](https://bluesyoung-web.gitee.io/admin-vue3-element3-vite2)
- 本项目创意源自 Vue-Element-Admin
- 主用技术栈：Vue3 Element-Plus TypeScript
- 此版本为 admin-vue3-element3 的改进版：
  - [x] 采用全新的 vite2.0
  - [x] 加入了 polyfill，兼容性(**国产浏览器的极速模式及所有的现代浏览器**)
  - [x] 方法自动按需导入(基于[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import))
  - [x] 组件自动按需导入(基于[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components))
  - [x] 图标自动按需导入(基于[unplugin-icons](https://github.com/antfu/unplugin-icons))
  - [x] 防抖与节流的自定义指令
  - [x] 二次封装常用组件
    - 表格(配套导出为Excel表的方法)
    - 表单(用JSON配置书写表单项)
    - 右键菜单
    - 弹出层
    - 富文本编辑器
    - 分页
    - tab
    - ...
- **使用 windicss，零配置自动 css 摇树优化**
- **拥有自动创建页面的 node 脚本，实现页面创建及路由注册自动化**
