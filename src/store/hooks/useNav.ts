/*
 * @Author: zhangyang
 * @Date: 2021-03-12 13:40:11
 * @LastEditTime: 2021-03-12 13:48:27
 * @Description: 导航相关
 */
import { reactive, Ref, toRefs } from 'vue';
import deepClone from '../../util/deepClone';

interface NavState {
  leftArr: NavArrItem[];
};

interface Instance {
  leftArr: Ref<NavArrItem[]>;
  setLeftArr: (arr: NavArrItem[]) => void;
};

let instance: Instance;

export default () => {
  if (!instance) {
    let state = reactive<NavState>({
      leftArr: []
    });
    const setLeftArr = (arr: NavArrItem[]) => {
      state.leftArr = deepClone(arr);
    };
    instance = {
      ...toRefs(state),
      setLeftArr
    }
  }
  return instance;
};