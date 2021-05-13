<!--
 * @Author: zhangyang
 * @Date: 2021-03-25 11:46:31
 * @LastEditTime: 2021-04-28 16:24:23
 * @Description: tab 组件
-->
<template>
  <young-tabs v-model="activeTab" :tabs-menu="tabsMenu">
    <template #t1>
      <h1 class="h1-test">我是标签页1</h1>
    </template>
    <template #t2>
      <h1>我是标签页2</h1>
    </template>
    <template #t3>
      <h1>我是标签页3</h1>
    </template>
  </young-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Tabs',
  setup() {
    const tabsMenu = ref<TabItem[]>([
      { label: 'tab1', name: 't1' },
      { label: 'tab2', name: 't2' },
      { label: 'tab3', name: 't3' }
    ]);
    const activeTab = ref('t1');
    return {
      tabsMenu,
      activeTab
    };
  }
});
</script>

<style scoped>
/* 引入 tailwind */
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
.h1-test {
  @apply text-9xl text-center text-blue-600 sm:bg-black;
}
</style>
