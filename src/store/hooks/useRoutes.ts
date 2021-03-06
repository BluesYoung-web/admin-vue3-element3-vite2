/*
 * @Author: zhangyang
 * @Date: 2021-03-12 14:06:12
 * @LastEditTime: 2021-03-12 14:59:32
 * @Description: 路由相关
 */
import { reactive, Ref, toRefs } from 'vue';
import { routes } from '../../route/index';
import { RouteRecordRaw } from 'vue-router';
import deepClone from '../../util/deepClone';

interface RoutesState {
  /**
   * 当前所有的路由
   */
   currentRoutes: RouteRecordRaw[];
   /**
    * 异步路由
    */
   addRoutes: RouteRecordRaw[];
};

interface Instance {
  currentRoutes: Ref<RouteRecordRaw[]>;
  addRoutes: Ref<RouteRecordRaw[]>;
  setRoutes: (r: RouteRecordRaw[]) => void;
};

let instance: Instance;

export default () => {
  if (!instance) {
    let state = reactive<RoutesState>({
      currentRoutes: routes,
      addRoutes: []
    });
    const setRoutes = (r: RouteRecordRaw[]) => {
      state.addRoutes = deepClone(r);
      state.currentRoutes = state.currentRoutes.concat(r);
    };
    // @ts-ignore
    instance = {
      ...toRefs(state),
      setRoutes
    }
  }
  return instance;
};