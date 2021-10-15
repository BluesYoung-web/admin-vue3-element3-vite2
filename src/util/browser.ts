/*
 * @Author: zhangyang
 * @Date: 2021-10-15 11:47:40
 * @LastEditTime: 2021-10-15 12:01:02
 * @Description: 浏览器相关的接口
 */
/**
 * 滚动到顶部
 */
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};
/**
 * 滚动到底部
 */
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}
/**
 * 滚动到指定元素的区域
 */
export const smoothScroll = (element: keyof HTMLElementTagNameMap) => {
  document.querySelector(element)?.scrollIntoView({
    behavior: 'smooth'
  });
};
/**
 * 获取可视窗口宽高
 * @returns [clientWidth, clientHeight]
 */
export const getClientHeight = () => {
  let clientWidth = 0, clientHeight = 0;
  clientWidth = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return [clientWidth, clientHeight];
};
/**
 * 窗口全屏
 */
export const toFullScreen = async () => {
  let element = document.body as any;
  if (element.requestFullscreen) {
    await element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    await element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    await element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    await element.webkitRequestFullScreen();
  }
};
/**
 * 退出全屏
 */
export const exitFullscreen = async () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // @ts-ignore
  } else if (document.msExitFullscreen) {
    // @ts-ignore
    document.msExitFullscreen();
    // @ts-ignore
  } else if (document.mozCancelFullScreen) {
    // @ts-ignore
    document.mozCancelFullScreen();
    // @ts-ignore
  } else if (document.webkitExitFullscreen) {
    // @ts-ignore
    document.webkitExitFullscreen();
  }
}
