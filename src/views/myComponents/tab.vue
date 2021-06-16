<!--
 * @Author: zhangyang
 * @Date: 2021-03-25 11:46:31
 * @LastEditTime: 2021-06-16 17:00:48
 * @Description: tab 组件
-->
<template>
  <young-tabs v-model="activeTab" :tabs-menu="tabsMenu">
    <template #t1>
      <h1 class="h1-test">我是标签页1</h1>
    </template>
    <template #t2>
      <h1 class="js-in-css" @click="color='skyblue'">我是标签页2</h1>
    </template>
    <template #t3>
      <h1 class="text-blue-900 lg:text-red-500 text-stroke-sm text-stroke-blue-gray-500 via-red-700">我是标签页3</h1>
    </template>
    <template #t4>
      <div>
        <div class="bg-blue-900 w-1850px h-600px" @contextmenu.prevent="showContext = true" />
        <young-context-menu v-model="showContext" :menu-list="[{ handlerName: 'test', title: '测试111' }]" />
      </div>
    </template>
  </young-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import YoungContextMenu from '/components/YoungContextMenu/index.vue';
const tabsMenu = ref<TabItem[]>([
  { label: 'tab1', name: 't1' },
  { label: 'tab2', name: 't2' },
  { label: 'tab3', name: 't3' },
  { label: 'tab4', name: 't4' },
]);
const activeTab = ref('t1');
const color = ref('red');
const showContext = ref(false);
</script>

<style lang="postcss" scoped>
.h1-test {
  @apply text-9xl text-center text-blue-600 sm:bg-black;
}
.js-in-css {
  color: v-bind(color);
}
</style>
