<!--
 * @Author: zhangyang
 * @Date: 2021-05-29 16:37:49
 * @LastEditTime: 2021-07-07 10:25:52
 * @Description: useEventListener 使用示例
-->
<template>
  <div class="main">
    <el-card class="board">
      <textarea v-model="inputMsg" ref="inputRef" class="p-2" placeholder="请输入任意内容" />
    </el-card>
    <el-card class="board">
      <pre class="text-2xl text-center font-bold">{{ toBeDisplay }}</pre>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { ref } from 'vue';
const inputMsg = ref('');
const inputRef = ref<HTMLDivElement>();
const toBeDisplay = ref('');
useEventListener(inputRef, 'input', (_) => {
  toBeDisplay.value = inputMsg.value;
});
useEventListener(document, 'visibilitychange', () => console.log('页面显示状态变更'));
</script>

<style lang="postcss" scoped>
  .main {
    @apply flex w-full h-800px flex items-center justify-between p-10;
  }
  .board {
    @apply w-12/25 h-full;
  }
  textarea {
    @apply w-full h-680px;
  }
</style>
