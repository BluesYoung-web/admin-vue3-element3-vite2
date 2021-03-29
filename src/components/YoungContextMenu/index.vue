<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:56:45
 * @LastEditTime: 2021-03-26 17:27:18
 * @Description: 上下文菜单组件
-->
<template>
  <teleport to="body">
    <div v-show="modelValue" class="cover" @click="close">
      <ul
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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
interface ContextMenuItem {
  handlerName: string;
  title: string;
}
export default defineComponent({
  name: 'YoungContextMenu',
  props: {
    modelValue: { type: Boolean, required: true },
    left: { type: [Number, String], required: true },
    top: { type: [Number, String], required: true },
    menuList: { type: Object as PropType<ContextMenuItem[]>, required: true }
  },
  emits: ['update:modelValue', 'clickItem'],
  setup(props, { emit }) {
    const clickHandler = (handler: string) => {
      emit('clickItem', handler);
    };
    const close = () => {
      emit('update:modelValue', false);
    };
    return {
      clickHandler,
      close
    };
  }
});
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