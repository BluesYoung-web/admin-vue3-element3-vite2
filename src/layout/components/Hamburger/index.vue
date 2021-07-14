<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:04:10
 * @LastEditTime: 2021-07-14 12:07:11
 * @Description: 侧边栏开关按钮组件
-->
<template>
  <div class="px-15px" @click="$emit('toggleClick')">
    <svg
      :class="isActive ? 'rotate-180': ''"
      class="w-20px h-20px inline-block align-middle transform transition-transform duration-500 ease-in-out"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>
  </div>
</template>
<script lang="ts" setup>
interface Props { isActive: boolean };
const props = withDefaults(defineProps<Props>(), { isActive: false });
const emit = defineEmits(['toggleClick']);
</script>
