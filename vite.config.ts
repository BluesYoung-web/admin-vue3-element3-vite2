/*
 * @Author: zhangyang
 * @Date: 2021-02-24 11:28:17
 * @LastEditTime: 2021-03-02 14:36:25
 * @Description: 配置文件
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import { resolve } from 'path';
import { writeFileSync, unlinkSync, readFileSync } from 'fs';
import dotenv from 'dotenv';

const envFiles = [
  /** default file */ `.env`,
  /** mode file */ `.env.${process.env.NODE_ENV}`
];

try {
  for (const file of envFiles) {
    const envConfig = dotenv.parse(readFileSync(file));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
} catch (error) {
  console.log(error);
}
// 打包的文件没有代理，直接换为原地址；
// 如果此处不换则需后端设置 nginx 代理
if (process.env.IS_ONLINE) {
  writeFileSync('.env.local', 'VITE_ONLINE_FLAG = true', 'utf-8');
} else {
  try {
    unlinkSync('.env.local');
  } catch (error) {
    console.log(error);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
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
    legacy()
  ],
  server: {
    open: true,
    port: 9527,
    /**
     * 本地代理服务器
     */
    proxy: {
      [process.env.VITE_API]: {
        target: process.env.VITE_BASE_HTTP,
        changeOrigin: true,
        // 此处替换的字符会拼接于真实请求之后，按需修改
        rewrite: path => path.replace(/^\/api/, '')
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
