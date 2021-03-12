<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 17:07:36
 * @LastEditTime: 2021-03-12 15:56:42
 * @Description: 所有的子页面都在此组件内部显示
-->
<template>
  <div class="app-main">
    <router-view :key="path" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <transition name="fade-transform" mode="out-in">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useTagsView } from '../../store';
export default defineComponent({
  name: 'AppMain',
  setup() {
    const { cachedViews } = useTagsView();
    const route = useRoute();
    const path = computed(() => route.path);
    return {
      cachedViews,
      path
    };
  }
});
</script>

<style lang="scss" scoped>
  .app-main {
    min-height: calc(100vh - 85px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
  .fixed-header + .app-main {
    padding-top: 100px;
  }
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>

