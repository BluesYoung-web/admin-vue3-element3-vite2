<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:35:58
 * @LastEditTime: 2021-09-06 10:55:08
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
      :menu-list="menuList"
      @clickItem="clickItemHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import YoungContextMenu from '../../components/YoungContextMenu/index.vue';
import ScrollPane from '../components/ScrollPane/index.vue';
import { useRoutes, useTagsView } from '../../store';
interface MenuItem {
  title: string;
  handlerName: string;
};
type Handlers = Record<string, () => void>;
const showContextMenu = ref(false);
const { visitedViews, cachedViews, updateVisitedView, delView, delCachedView, delOtherViews, delAllViews, addView } = useTagsView();
const menuList = computed(() => {
  let baseMenu: MenuItem[] = [
    { title: '关闭此页面', handlerName: 'closeThis' },
    { title: '关闭其他页面', handlerName: 'closeOthers' }
  ];
  if (visitedViews.value.length === 1) {
    baseMenu = [];
  }
  const { name } = route;
  const s_name = selectedTag.value?.name ?? '';
  // 当前页为激活状态才允许刷新
  const res = (cachedViews.value.includes(s_name) && name === s_name) ? [{ title: '刷新此页面', handlerName: 'refresh' }].concat(baseMenu) : baseMenu;
  return res;
});
const router = useRouter();
const route = useRoute();
/**
 * 当前选中的标签
 */
const selectedTag = ref<YoungRoute | null>(null);
/**
 * 所有固定的标签(禁止关闭)
 */
const affixTags = ref<YoungRoute[]>([]);

const isActive = (view: YoungRoute) => view.path === route.path;
const isAffix = (route: YoungRoute) => route?.meta?.affix ?? false;

const toLastView = (visitedViews: YoungRoute[], view: YoungRoute) => {
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

const moveToCurrentTag = () => {
  nextTick(() => {
    const SP = scrollPane.value as unknown as any;
    SP && SP.moveToTarget?.();
    SP && updateVisitedView(route as unknown as YoungRoute);
  });
};

const menuHandlers: Handlers = {
  'refresh': () => {
    const tag = selectedTag.value;
    tag && delCachedView(tag);
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
      if (affixTags.value.some((tag) => tag.path === sTag.path)) {
        return;
      }
      toLastView(visitedViews.value, sTag);
    }
  }
};
const clickItemHandler = (handler: string) => {
  menuHandlers?.[handler]?.();
  showContextMenu.value = false;
};
const openContextMenu = (tag: YoungRoute, e: MouseEvent) => {
  nextTick(() => {
    if (menuList.value.length === 0) {
      return;
    }
    showContextMenu.value = true;
    selectedTag.value = tag;
  });
};
const addTags = () => {
  const { name } = route;
  name && addView(route as unknown as YoungRoute);
};
const resolve = (base: string, path: string) => {
  if (base.slice(-1) === '/') {
    return `${base.substr(0, base.length)}${path}`
  } else {
    return `${base}${path}`
  }
};
const filterAffixTags = (routes: YoungRoute[], basePath = '/') => {
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
 * 路由表
 */
const { currentRoutes: routes } = useRoutes();
const initTags = () => {
  affixTags.value = filterAffixTags(routes.value as unknown as YoungRoute[]);
  for (const tag of affixTags.value) {
    tag.name && addView(tag as unknown as YoungRoute);
  }
};
watchEffect(() => {
  route.fullPath; // 仅为触发副作用
  nextTick(() => {
    addTags();
    moveToCurrentTag();
  });
});

/**
 * 关闭标签页
 */
const closeSelectedTag: (tag?: YoungRoute | null) => void = menuHandlers['closeThis'];

onMounted(() => {
  initTags();
  addTags();
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
