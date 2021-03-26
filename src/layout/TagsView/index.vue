<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:35:58
 * @LastEditTime: 2021-03-26 17:48:48
 * @Description: 标签选项卡组件
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tagList"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent="openContextMenu(tag, $event)"
      >
        <span v-if="tag.meta && tag.meta.icon" :class="'el-icon-' + tag.meta.icon" />
        {{ tag.meta.title }}
        <span v-if="!isAffix(tag) && (visitedViews.length > 1)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <young-context-menu
      v-model="showContextMenu"
      :left="left"
      :top="top"
      :menu-list="menuList"
      @clickItem="clickItemHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick, computed, watch, onMounted, Ref, toRefs } from 'vue';
import YoungContextMenu from '../../components/YoungContextMenu/index.vue';
import { RouteLocation, RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import ScrollPane from '../components/ScrollPane/index.vue';
import { useRoutes, useTagsView } from '../../store';

export interface MenuItem {
  title: string;
  handlerName: string;
};
interface Handlers {
  [props: string] : () => void
};
export default defineComponent({
  name: 'TagsView',
  components: { ScrollPane, YoungContextMenu },
  setup() {
    /**
     * 显示上下文菜单的标志
     */
    const showContextMenu = ref(false);
    const left = ref(0);
    const top = ref(0);
    /**
     * 上下文菜单项
     */
    const menuList = computed(() => {
      let baseMenu = [
        { title: '关闭此页面', handlerName: 'closeThis' },
        { title: '关闭其他页面', handlerName: 'closeOthers' }
      ];
      const all = visitedViews.value.length;
      if (all === 1) {
        baseMenu = [];
      }
      const { name } = route;
      const s_name = selectedTag.value?.name;
      const res = (cachedViews.value.includes(s_name) && name === s_name) ? [{ title: '刷新此页面', handlerName: 'refresh' }].concat(baseMenu) : baseMenu;
      return res;
    });
    const router = useRouter();
    const route = useRoute();
    /**
     * 当前选中的标签
     */
    const selectedTag: Ref<RouteLocation | null> = ref(null);
    /**
     * 所有固定的标签(禁止关闭)
     */
    let affixTags = reactive<RouteLocation[]>([]);

    /**
     * 判断激活的标签是否为当前页
     */
    const isActive = (view: RouteLocation) => view.path === route.path;
    /**
     * 判断该标签是否为固定标签
     */
    const isAffix = (route: RouteRecordRaw | RouteLocation) => route?.meta?.affix;
    /**
     * 返回上一个激活的页面
     */
    const toLastView = (visitedViews: RouteLocation[], view: RouteLocation) => {
      const lastView = visitedViews.slice(-1)[0];
      if (lastView) {
        router.push(lastView.fullPath);
      } else {
        if (view.name === 'default') {
          addTags();
        } else {
          initTags();
          addTags();
        }
      }
    };

    const tagList = ref(null);
    const scrollPane = ref(null);
    const {
      visitedViews,
      cachedViews,
      updateVisitedView,
      delView,
      delCachedView,
      delOtherViews,
      delAllViews,
      addView
    } = useTagsView();
    /**
     * 移动到当前标签位置
     */
    const moveToCurrentTag = () => {
      nextTick(() => {
        const SP = scrollPane.value;
        console.log(SP);
        
        SP && (SP as any).moveToTarget();
        SP && updateVisitedView(route);
      });
    };
    /**
     * 上下文菜单对应的处理函数对象
     */
    const menuHandlers: Handlers = {
      'refresh': () => {
        const tag = selectedTag.value;
        if (tag) {
          delCachedView(tag);
        }
      },
      'closeThis': (tag = selectedTag.value) => {
        if (tag) {
          if (!isAffix(tag)) {
            delView(tag);
            isActive(tag) && toLastView(visitedViews.value, tag);
          }
        }
      },
      'closeOthers': () => {
        const tag = selectedTag.value;
        if (tag) {
          router.push(tag);
          delOtherViews(tag);
        }
      },
      'closeAll': () => {
        delAllViews();
        const sTag = selectedTag.value;
        if (sTag) {
          if (affixTags.some((tag) => tag.path === sTag.path)) {
            return;
          }
          toLastView(visitedViews.value, sTag);
        }
      }
    };
    /**
     * 点击上下文菜单的回调函数
     */
    const clickItemHandler = (handler: string) => {
      menuHandlers[handler] && menuHandlers[handler]();
      showContextMenu.value = false;
    };
    /**
     * 显示上下文菜单
     */
    const openContextMenu = (tag: RouteLocation, e: MouseEvent) => {
      nextTick(() => {
        if (menuList.value.length === 0) {
          return;
        }
        const menuMinWidth = 105;
        const screenWidth = window.innerWidth;
        const normal = e.clientX;
        left.value = (normal + menuMinWidth + 200 < screenWidth) ? normal : (normal - menuMinWidth);
        
        top.value = e.clientY;
        showContextMenu.value = true;
        selectedTag.value = tag;
      });
    };
    /**
     * 添加标签
     */
    const addTags = () => {
      const { name } = route;
      name && addView(route);
    };
    /**
     * 初始化标签
     */
    const initTags = () => {
      affixTags = filterAffixTags(routes.value as unknown as RouteRecordRaw[]);
      for (const tag of affixTags) {
        tag.name && addView(tag as unknown as RouteLocation);
      }
    };
    /**
     * 过滤固定标签
     */
    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: any[] = [];
      
      routes.forEach((route) => {
        if (isAffix(route)) {
          const tagPath = resolve(basePath, route.path);
          tags.push({
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
          if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path);
            if (tempTags.length > 0) {
              tags = [...tags, ...tempTags]
            }
          }
        }
      });
      return tags;
    };
    /**
     * 路径拼接
     */
    const resolve = (base: string, path: string) => {
      if (base.slice(-1) === '/') {
        return `${base.substr(0, base.length)}${path}`
      } else {
        return `${base}${path}`
      }
    };

    /**
     * 路由表
     */
    const { currentRoutes: routes } = useRoutes();

    watch(() => route.fullPath, () => {
      addTags();
      nextTick(() => {
        moveToCurrentTag();
      });
    });

    /**
     * 关闭标签页
     */
    const closeSelectedTag: (tag?: RouteLocation | null) => void = menuHandlers['closeThis']

    onMounted(() => {
      initTags();
      addTags();
    });
    return {
      showContextMenu,
      left,
      top,
      tagList,
      scrollPane,
      menuList,
      clickItemHandler,
      openContextMenu,
      visitedViews,
      isActive,
      isAffix,
      closeSelectedTag
    };
  }
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
      }
    }
  }
}
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
