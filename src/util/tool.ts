/*
 * @Author: zhangyang
 * @Date: 2021-07-03 15:05:07
 * @LastEditTime: 2021-10-15 16:08:33
 * @Description: 自定义工具函数
 */
export const sleep = async (n: number) => {
  return new Promise((resolve) => setTimeout(resolve, n * 1000));
};

import { useClipboard } from '@vueuse/core';
export const copy2Clipboard = async (str: string) => {
  const { copy, copied, isSupported } = useClipboard();
  if (isSupported) {
    await copy(str);
    if (copied.value) {
      ElMessage.success('已复制到剪切板！');
    } else {
      ElMessage.error('复制失败！');
    }
  } else if (document.execCommand) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    ElMessage.success('已复制到剪切板！');
  } else {
    ElMessage.error('浏览器不支持!');
  }
};
/**
 * 状态切换带函数执行，初始状态为假
 * @param f1 首次执行的函数
 * @param f2 状态变换之后执行的函数
 * @returns [v: Ref<boolean>, toggleFn: () => void]
 */
export const useToggle = (f1: Function, f2: Function) => {
  const v = ref(false);
  return [
    v,
    () => {
      v.value ? f2() : f1();
      v.value = !v.value;
    }
  ]
};
