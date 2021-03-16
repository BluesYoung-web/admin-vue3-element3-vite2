/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-03-16 15:05:19
 * @Description: 配置文件
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import SvgIcons from 'vite-plugin-svg-icons';

import { resolve } from 'path';
import { writeFileSync, unlinkSync } from 'fs';

// 是否启用本地 Mock
if (process.env.USE_MOCK) {
  writeFileSync('.env.local', 'VITE_USE_MOCK = true', 'utf-8');
} else {
  try {
    unlinkSync('.env.local');
  } catch (error) {
    console.log(error);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
      '/components': resolve(__dirname, './src/components'),
      '/views': resolve(__dirname, './src/views')
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    SvgIcons({ iconDirs: [resolve(__dirname, 'src/icons')], symbolId: 'icon-[dir]-[name]' }),
    legacy()
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
  build: {
    target: 'es2015',
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
})
