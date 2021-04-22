<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 17:07:36
 * @LastEditTime: 2021-04-22 14:50:56
 * @Description: 所有的子页面都在此组件内部显示
-->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <div>
          <keep-alive>
            <component v-if="isCached" :is="Component" :key="path" />
          </keep-alive>
          <component v-if="!isCached" :is="Component" :key="path" />
        </div>
      </transition>
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
    const route = useRoute();
    const { cachedViews, visitedViews } = useTagsView();
    const path = computed(() => route.path);
    const name = computed(() => route.name);
    const isCached = computed(() => {
      const arr = visitedViews.value.map((view) => view.name);
      // 已经缓存，或者首次打开(防止二次初始化)
      return cachedViews.value.includes(name.value) || !arr.includes(name.value);
    });
    return {
      isCached,
      path,
      cachedViews
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

