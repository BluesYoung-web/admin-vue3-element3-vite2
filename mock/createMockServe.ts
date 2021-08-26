/*
 * @Author: zhangyang
 * @Date: 2021-08-26 09:47:54
 * @LastEditTime: 2021-08-26 17:22:09
 * @Description: mock 中间件，可看到请求
 */

// 灵感来源 https://github.com/anncwb/vite-plugin-mock

import type { Plugin, ResolvedConfig } from 'vite';
// 仅为触发装饰器，注册对应的回调
import './Controller/index';
import { controllerMap } from './decorator/MockApi';
import { bodyParse } from './utils';
export const createMockServe = (opt: Young.MockPluginConfig = {}): Plugin => {
  let _config: ResolvedConfig;
  let mode = '';
  let enableSourceMap = false;
  return {
    /**
     * 插件名称
     */
    name: 'vite:mock',
    /**
     * 插件使用顺序相关
     */
    enforce: 'pre',
    /**
     * 获取最终配置
     */
    configResolved(resolvedConfig) {
      _config = resolvedConfig;
      mode = _config.mode;
      enableSourceMap = !!_config.build.sourcemap;
    },
    /**
     * 本地 koa 服务器的钩子，添加自定义中间件
     */
    configureServer: async ({ middlewares }) => {
      const { VITE_BASE_HTTP = '/api' } = opt.viteEnv ?? {};
      const reg = new RegExp(VITE_BASE_HTTP + '$');
      middlewares.use(async (req, res, next) => {
        if (req.url?.match(reg)) {
          const params = await bodyParse(req);
          const { com, task } = params;
          const controller = controllerMap.get(`${com}/${task}`);
          if (controller instanceof Function) {
            const result = controller(params);
            res.end(JSON.stringify(result));
          } else {
            next();
          }
        } else {
          next();
        }
      });
    },
    /**
     * 代码转换(代码注入)
     */
    async transform(code, id) {
      if (id.endsWith('/src/main.ts')) {
        let injectCode = '';
        if (mode === 'mock') {
          // 本地开发
          const command = _config.command
          if (command === 'serve') {
            injectCode = `
              console.log('本地开发，启用中间件作为mock')
            `;
          } else {
            injectCode = `
              console.log('打包，直接使用mockjs拦截XHR');
              import { useMock } from '../mock/index';
              useMock();
            `;
          }
        }
        return {
          map: enableSourceMap ? this.getCombinedSourcemap() : null,
          code: `${code}\n${injectCode}`
        };
      } else {
        return null;
      }
    }
  };
}
