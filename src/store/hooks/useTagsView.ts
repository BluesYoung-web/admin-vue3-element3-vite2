/*
 * @Author: zhangyang
 * @Date: 2021-03-12 15:00:45
 * @LastEditTime: 2021-03-25 17:17:48
 * @Description: 
 */
import { RouteLocation } from "vue-router";
import { reactive, Ref, toRefs } from 'vue';
type CachedView = string | symbol | null | undefined;
interface TagsViewState {
  /**
   * 访问过的页面，路由对象
   */
  visitedViews: RouteLocation[];
  /**
  * 已缓存的页面名称
  */
  cachedViews: CachedView[];
};
interface Instance {
  visitedViews: Ref<RouteLocation[]>;
  cachedViews: Ref<CachedView[]>;
  addView: (view: RouteLocation) => void;
  delView: (view: RouteLocation) => void;
  delOtherViews: (view: RouteLocation) => void;
  delAllViews: () => void;
  updateVisitedView: (view: RouteLocation) => void;
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
    const addView = (view: RouteLocation) => {
      // 查询是否已经访问过
      if (!state.visitedViews.some((v) => v.path === view.path)) {
        // 添加到已访问
        view.meta.title && state.visitedViews.push(Object.assign({}, view, {
          title: view.meta.title,
          icon: view.meta.icon??null
        }));
      }

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
    const delView = (view: RouteLocation) => {
      // 删除访问记录
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      // 删除缓存
      const index = state.cachedViews.indexOf(view.name);
      index > -1 && state.cachedViews.splice(index, 1);
    };
    /**
     * 关闭其他页面
     */
    const delOtherViews = (view: RouteLocation) => {
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
    const updateVisitedView = (view: RouteLocation) => {
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
      delOtherViews,
      delAllViews,
      updateVisitedView
    }
  }
  return instance;
};