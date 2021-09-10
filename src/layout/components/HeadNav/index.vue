<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:10:36
 * @LastEditTime: 2021-09-10 09:07:48
 * @Description: 顶部导航(一级节点)
-->
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="(key) => activeIndex=key">
    <el-menu-item v-for="(route, index) in routes" :key="index" :item="route" :index="route.node_name" v-text="route.node_name" />
  </el-menu>
</template>
<script lang="ts" setup>
import { NAV_ARR } from '../../../store/sessionStorage/index';
import { useNav } from '../../../store';
import { useLocalStorage } from '@vueuse/core';

const navKey: symbol = Symbol('__顶部导航名称__');

// 获取顶部导航栏数据(一级节点)
const routes = computed(() => NAV_ARR.value.filter((item) => item.is_show === 1));
// 设置对应的侧边导航栏数据(二级节点及以后)
const { setLeftArr } = useNav();
setLeftArr(routes.value[0]?.part ?? []);
// 初始激活标签
const activeIndex = useLocalStorage(navKey.toString(), routes.value[0]?.node_name ?? '');

watchEffect(() => {
  routes.value?.forEach((item) => {
    item.node_name === activeIndex.value && setLeftArr(item.part);
  });
});
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
</style>
