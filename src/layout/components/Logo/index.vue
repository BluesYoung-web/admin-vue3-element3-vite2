<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:10:09
 * @LastEditTime: 2021-04-27 20:58:25
 * @Description: 侧边栏 logo 组件
-->
<template>
  <div class="sidebar-logo-container" :class="collapse ? 'collapse' : ''">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="/src/assets/img/logo.png" class="sidebar-logo-hide">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="/src/assets/img/logo.png" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useApp } from '../../../store';
export default defineComponent({
  name: 'Logo',
  setup() {
    const title = import.meta.env.VITE_TITLE??'小黑后台';
    const { sidebar } = useApp();
    const collapse = computed(() => !sidebar.value.opened);
    return {
      title,
      collapse
    };
  }
});
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }
      & .sidebar-logo-hide {
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }
    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
</style>
