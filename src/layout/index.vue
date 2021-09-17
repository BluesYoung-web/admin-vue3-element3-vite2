<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 17:14:23
 * @LastEditTime: 2021-09-17 16:23:10
 * @Description: 整体布局
-->
<template>
  <!-- 页面整体布局 -->
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NavBar, Sidebar, AppMain, TagsView } from './AppMain/index';
import { APP_CONFIG } from '../store';
// sidebar 与组件重名，会导致解析异常
const classObj = computed(() => {
  return {
    hideSidebar: !APP_CONFIG.value.sidebar_opened,
    openSidebar: APP_CONFIG.value.sidebar_opened
  };
});
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";
@import "../styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>
