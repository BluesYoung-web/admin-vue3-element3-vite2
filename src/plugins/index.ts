/*
 * @Author: zhangyang
 * @Date: 2021-03-04 15:51:05
 * @LastEditTime: 2021-08-27 09:30:21
 * @Description: 批量安装自定义插件
 */
import type { App } from 'vue';

export default {
  install: (app: App<Element>, options: any) => {
    const plugins = import.meta.globEager('./directives/*.ts');
    for (const plugin of Object.values(plugins)) {
      app.use(plugin.default);
    }
  }
};
