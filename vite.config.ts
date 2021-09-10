/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-09-10 08:31:07
 * @Description: 配置文件
 */
import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import Windicss from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import AutoComopnents from 'unplugin-vue-components/vite';
import AutoIcons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
// 自动处理 optimizeDeps 缓存
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';

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
      AutoComopnents({
        dirs: ['./src/components'],
        dts: './src/auto-components.d.ts',
        resolvers: [ElementPlusResolver(), IconsResolver({ componentPrefix: 'icon' })]
      }),
      AutoImport({
        dts: './src/auto-imports.d.ts',
        imports: ['vue', 'vue-router', {
          'element-plus': ['ElMessage', 'ElMessageBox'],
          './young-common-expose': ['deepClone', 'isArray', 'isJsonStr']
        }]
      }),
      AutoIcons({ scale: 1.5 }),
      vueJsx(),
      Windicss(),
      PkgConfig(),
      OptimizationPersist(),
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
    }
  });
}
