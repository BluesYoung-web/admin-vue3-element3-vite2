<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:10:36
 * @LastEditTime: 2021-09-17 16:23:46
 * @Description: 顶部导航(一级节点)
-->
<template>
  <div class="h-full py-2">
    <young-tabs v-model="HEAD_NAV_INDEX" :tabs-menu="headMenu" />
  </div>
</template>
<script lang="ts" setup>
import { NAV_ARR, LEFT_NAV } from '../../../store';
import { HEAD_NAV_INDEX } from '../../../store';

// 获取顶部导航栏数据(一级节点)
const routes = computed(() => NAV_ARR.value.filter((item) => item.is_show === 1));
const headMenu = computed(() => routes.value.map((item, index) => {
  const temp: TabItem = { label: item.node_name, name: index + '' };
  return temp;
}));

watchEffect(() => {
  const route = routes.value[+HEAD_NAV_INDEX.value];
  // 更新对应的侧边导航栏数据(二级节点及以后)
  LEFT_NAV.value = deepClone(route.part);
});
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
