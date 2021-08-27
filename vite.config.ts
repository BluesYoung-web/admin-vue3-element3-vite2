/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-08-27 11:43:22
 * @Description: 配置文件
 */
import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import SvgIcons from 'vite-plugin-svg-icons';
import Windicss from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';

import { resolve } from 'path';
import { createMockServe } from './mock/createMockServe';
// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  // 解析 env 文件
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);

  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '/components': resolve(__dirname, './src/components'),
        '/views': resolve(__dirname, './src/views'),
        './young-common-expose': resolve(__dirname, './src/young-common-expose.ts')
      }
    },
    plugins: [
      vue(),
      createMockServe({ viteEnv }),
      AutoImport({
        dts: './src/auto-imports.d.ts',
        imports: ['vue', 'vue-router', {
          'element-plus': ['ElMessage', 'ElMessageBox'],
          './young-common-expose': ['deepClone', 'isArray', 'isJsonStr']
        }]
      }),
      vueJsx(),
      SvgIcons({ iconDirs: [resolve(__dirname, 'src/icons')], symbolId: 'icon-[dir]-[name]' }),
      Windicss(),
      // 不生成同名 polyfill 文件，打包速度翻倍
      // 如果出现兼容问题，可以删除此配置
      legacy({ renderLegacyChunks: false })
    ],
    server: {
      open: true,
      port: 9527,
      /**
       * 本地代理服务器
       */
      proxy: {
        [process.env.VITE_BASE_HTTP]: {
          target: process.env.VITE_BASE_HTTP,
          changeOrigin: true,
          // 此处替换的字符会拼接于真实请求之后，按需修改
          rewrite: path => 'http://localhost'
        }
      }
    },
    logLevel: 'warn',
    build: {
      target: 'es2015',
      brotliSize: false,
      // sourcemap: true
    },
    optimizeDeps: {
      include: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        'element-plus',
        'element-plus/lib/locale/lang/zh-cn',
        'vue',
        'axios',
        'js-cookie'
      ]
    }
  });
}
