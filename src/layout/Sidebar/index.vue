<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 15:46:00
 * @LastEditTime: 2021-03-12 14:56:37
 * @Description: 侧边栏组件
-->
<template>
  <div :class="showLogo ? 'has-logo' : ''">
    <logo v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="false"
        :collapse="isCollapse"
        :default-active="activeMenu"
        background-color="#304156"
        active-text-color="#409EFF"
        text-color="#bfcbd9"
        mode="vertical"
      >
        <sidebar-item v-for="(route, index) in finalRoutes" :key="index + 'vdksjhgfew54654cds'" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Logo from '../components/Logo/index.vue';
import SidebarItem from '../components/SidebarItem/index.vue';
import { useApp, useNav } from '../../store';

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const showLogo = ref(true);
    const { sidebar } = useApp();
    const isCollapse = computed(() => sidebar.value.opened);
    const { leftArr: leftNavArr } = useNav();
    const finalRoutes = computed(() => leftNavArr.value);
    

    const activeMenu = computed(() => {
      const route = useRoute();
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path || '';
    });

    return {
      showLogo,
      isCollapse,
      finalRoutes,
      activeMenu
    };
  }
});
</script>