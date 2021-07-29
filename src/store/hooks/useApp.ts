/*
 * @Author: zhangyang
 * @Date: 2021-03-12 10:29:25
 * @LastEditTime: 2021-07-29 19:49:45
 * @Description: 侧边栏相关
 */
import { toRefs, reactive, Ref } from 'vue';
import Cookies from 'js-cookie';

const SIDE_BAR_STATUS = 'sidebarStatus';
const SIZE = 'size';

interface Sidebar {
  /**
   * 侧边栏开启状态
   */
  opened: boolean;
  /**
   * 是否禁用动画
   */
  withoutAnimation: boolean;
};

interface AppState {
  /**
   * 侧边栏状态
   */
  sidebar: Sidebar;
  /**
   * 设备类型(PC | 移动端)
   */
  device: string;
  /**
   * 窗口大小
   */
  size: string;
};

interface Instance {
  toggleSideBar(): void;
  setSize(size: string): void;
  setDevice(device: string): void;
  sidebar: Ref<{
    opened: boolean;
    withoutAnimation: boolean;
  }>;
  device: Ref<string>;
  size: Ref<string>;
}

let instance: Instance;

export default () => {
  if (!instance) {
    let state = reactive<AppState>({
      sidebar: {
        opened: !!Cookies.get(SIDE_BAR_STATUS) && (Cookies.get(SIDE_BAR_STATUS) ===  '1') || true,
        withoutAnimation: false
      },
      device: '',
      size: Cookies.get(SIZE) || 'medium'
    });

    const toggleSideBar = () => {
      state.sidebar.opened = !state.sidebar.opened;

      if (state.sidebar.opened) {
        Cookies.set(SIDE_BAR_STATUS, '1');
      } else {
        Cookies.set(SIDE_BAR_STATUS, '0');
      }
    };

    const setSize = (size: string) => {
      state.size = size;
    };

    const setDevice = (device: string) => {
      state.device = device;
    };

    instance = {
      ...toRefs(state),
      toggleSideBar,
      setSize,
      setDevice
    };
  }

  return instance;
};
