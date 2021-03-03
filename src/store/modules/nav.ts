/*
 * @Author: zhangyang
 * @Date: 2020-12-08 09:26:11
 * @LastEditTime: 2021-03-02 10:21:15
 * @Description: 导航栏相关的 Vuex
 */
import { Commit, Dispatch, StoreOptions } from "vuex";

export interface NavState {
  /**
   * 左边导航栏的内容
   */
  leftArr: NavArrItem[];
}

interface ActionParams {
  commit: Commit;
  dispatch: Dispatch;
  state: NavState;
}

const nav: StoreOptions<any> = {
  state: () => ({
    leftArr: []
  }),
  mutations: {
    setLeftArr(state: NavState, arr: NavArrItem[]) {
      state.leftArr = arr;
    }
  },
  actions: {
    setLeftArrAsync({ commit, state }: ActionParams, arr: NavArrItem[]) {
      return new Promise((resolve) => {
        commit('setLeftArr', arr);
        resolve(state.leftArr);
      });
    }
  }
};

export default {
  namespaced: true,
  ...nav
}