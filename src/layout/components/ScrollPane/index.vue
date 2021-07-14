<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 11:02:54
 * @LastEditTime: 2021-07-14 15:28:56
 * @Description: 滚动容器
-->
<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="scrollHandler"
  >
    <slot />
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
type EL = Element | null;
/**
 * 标签间距
 */
const tagSpacing = 4;
const left = ref(0);
const scrollContainer = ref(null);
// 获取容器实例 el-scrollbar__wrap
const scrollWrapper = computed<HTMLElement>(() => (scrollContainer.value as any)?.wrap);
// 滚动鼠标滚轮
const scrollHandler = (e: WheelEvent) => {
  const eventData = e.deltaY * 40;
  const wrap = scrollWrapper.value;
  wrap.scrollLeft = wrap.scrollLeft + eventData / 4;
};
// 移动到目标标签的位置
const moveToTarget = () => {
  if (scrollContainer.value) {
    const el: HTMLElement = (scrollContainer.value as any)?.$el;
    // 外层包裹
    const wrap: HTMLElement = (scrollContainer.value as any)?.wrap;
    // 容器宽度
    const containerWidth = el.offsetWidth;
    // 标签列表
    const tagList: HTMLCollection = (el.children[0].firstChild as HTMLElement)?.children;

    let firstChild: EL = null, lastChild: EL = null, targetElement: EL = null;
    if (tagList.length > 0) {
      firstChild = tagList[0];
      lastChild = tagList[tagList.length - 1];
      for (const element of Array.from(tagList)) {
        if (Array.from(element.classList).includes('active')) {
          targetElement = element;
          break;
        }
      }

      if (firstChild === targetElement) {
        wrap.scrollLeft = 0;
      } else if (lastChild === targetElement) {
        wrap.scrollLeft = wrap.scrollWidth - containerWidth;
      } else {
        const currentIndex = Array.from(tagList).findIndex((item) => item === targetElement);

        const preElement = tagList[currentIndex - 1];
        const nextElement = tagList[currentIndex + 1];

        const afterNextTagOffsetLeft = (nextElement as HTMLElement).offsetLeft + (nextElement as HTMLElement).offsetWidth + tagSpacing;
        const beforePrevTagOffsetLeft = (preElement as HTMLElement).offsetLeft - tagSpacing;

        if (afterNextTagOffsetLeft > wrap.scrollLeft + containerWidth) {
          wrap.scrollLeft = afterNextTagOffsetLeft - containerWidth;
        } else if (beforePrevTagOffsetLeft < wrap.scrollLeft) {
          wrap.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    } else {
      return;
    }
  }
};
// 暴露给其父级组件通过 ref 使用
defineExpose({ moveToTarget });
</script>

<style lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
</style>
