/*
 * @Author: zhangyang
 * @Date: 2021-03-12 15:00:45
 * @LastEditTime: 2021-03-26 17:24:24
 * @Description:
 */
import { reactive, Ref, toRefs } from 'vue';
type CachedView = string | symbol | null | undefined;
interface TagsViewState {
  /**
   * 访问过的页面，路由对象
   */
  visitedViews: YoungRoute[];
  /**
  * 已缓存的页面名称
  */
  cachedViews: CachedView[];
};
interface Instance {
  visitedViews: Ref<YoungRoute[]>;
  cachedViews: Ref<(CachedView)[]>;
  addView(view: YoungRoute): void;
  delView(view: YoungRoute): void;
  delOtherViews(view: YoungRoute): void;
  delAllViews(): void;
  delCachedView(view: YoungRoute): void;
  updateVisitedView(view: YoungRoute): void;
};

let instance: Instance;

export default () => {
  if (!instance) {
    let state = reactive<TagsViewState>({
      visitedViews: [],
      cachedViews: []
    });
    /**
     * 打开某个页面
     */
    const addView = (view: YoungRoute) => {
      // 查询是否已经访问过
      if (!state.visitedViews.some((v) => v.path === view.path)) {
        // 添加到已访问
        view.meta.title && state.visitedViews.push(Object.assign({}, view, {
          title: view.meta.title,
          icon: view.meta.icon??null
        }));
      }
      addToCache(view);
    };
    /**
     * 添加页面到缓存
     */
    const addToCache = (view: YoungRoute) => {
      // 查询该标签是否已缓存
      if (state.cachedViews.includes(view.name)) {
        null;
      } else if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    };
    /**
     * 关闭某个页面
     */
    const delView = (view: YoungRoute) => {
      // 删除访问记录
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      // 删除缓存
      delCachedView(view);
    };
    /**
     * 删除页面缓存
     */
    const delCachedView = (view: YoungRoute) => {
      const index = state.cachedViews.indexOf(view.name);
      index > -1 && state.cachedViews.splice(index, 1);
    };
    /**
     * 关闭其他页面
     */
    const delOtherViews = (view: YoungRoute) => {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
      state.cachedViews = state.cachedViews.filter((v) => {
        return v === view.name;
      });
    };
    /**
     * 关闭所有页面
     */
    const delAllViews = () => {
      const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
      state.visitedViews = affixTags;
      state.cachedViews.length = 0;
    };
    /**
     * 移动到当前标签的位置
     */
    const updateVisitedView = (view: YoungRoute) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          return;
        }
      }
    };
    // @ts-ignore
    instance = {
      ...toRefs(state),
      addView,
      delView,
      delCachedView,
      delOtherViews,
      delAllViews,
      updateVisitedView
    }
  }
  return instance;
};
