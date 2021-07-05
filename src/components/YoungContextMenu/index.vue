<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:56:45
 * @LastEditTime: 2021-07-05 15:13:29
 * @Description: 上下文菜单组件
-->
<template>
  <teleport to="body">
    <div v-show="modelValue" class="cover" @click="close">
      <ul
        ref="menu"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li
          v-for="(item, index) in menuList"
          :key="index + 'fsdjfljk'"
          @click.stop="clickHandler(item.handlerName)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { useMouse } from '@vueuse/core';
import { nextTick, ref, watch } from 'vue';

interface ContextMenuItem {
  handlerName: string;
  title: string;
};
interface Props {
  modelValue: boolean;
  menuList: ContextMenuItem[];
};
const props = defineProps<Props>();
interface Emits {
  (e: 'update:modelValue', v: boolean): void;
  (e: 'clickItem', v: string): void;
};
const emit = defineEmits<Emits>();
const { x, y } = useMouse();
const left = ref(0);
const top = ref(0);
const menu = ref();
watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    nextTick(() => {
      const { width, height } = window.getComputedStyle(menu.value as HTMLElement);
      const { innerWidth, innerHeight } = window;
      // 此时鼠标的坐标
      const tx = x.value;
      const ty = y.value;
      // 此时自定义菜单的宽高
      const rw = parseFloat(width);
      const rh = parseFloat(height);
      // 处理边界值
      left.value = innerWidth - tx > rw ? tx : innerWidth - rw;
      top.value = innerHeight - ty > rh ? ty : innerHeight - rh;
    });
  }
});
const clickHandler = (handler: string) => {
  emit('clickItem', handler);
};
const close = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
.cover {
  background-color: rgba(200, 200, 200, 0);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1001;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
