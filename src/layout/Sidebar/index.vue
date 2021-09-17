<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 15:46:00
 * @LastEditTime: 2021-09-17 17:44:27
 * @Description: 侧边栏组件
-->
<template>
  <div :class="showLogo ? 'has-logo' : ''">
    <logo v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="false"
        :collapse="!isCollapse"
        :default-active="currentMenuIndex"
        background-color="#304156"
        active-text-color="#409EFF"
        text-color="#bfcbd9"
        mode="vertical"
      >
        <sidebar-item v-for="(route, index) in LEFT_NAV" :key="index + 'vdksjhgfew54654cds'" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import Logo from '../components/Logo/index.vue';
import SidebarItem from '../components/SidebarItem/index.vue';
import { APP_CONFIG, LEFT_NAV, useTagsView } from '../../store';
const { currentMenuIndex } = useTagsView();
const showLogo = ref(true);
const isCollapse = computed(() => APP_CONFIG.value.sidebar_opened);
</script>
