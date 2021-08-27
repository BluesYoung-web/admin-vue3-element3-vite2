<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 15:26:18
 * @LastEditTime: 2021-08-27 14:10:25
 * @Description: 侧边栏菜单项
-->
<template>
  <div>
    <template v-if="isOne">
      <app-link v-if="item.is_show" :to="resolvePath(item.node_path)">
        <el-menu-item :index="item.node_name" :class="isNest ? '' : 'submenu-title-noDropdown'">
          <sub-item :title="item.node_name" :icon="item.icon" />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else :index="item.node_name" popper-append-to-body>
      <template #title>
        <sub-item v-if="item.is_show" :title="item.node_name" :icon="item.icon" />
      </template>
      <sidebar-item v-for="child in item.part" :key="child.node_path" :item="child" :is-nest="isOne" :bath-path="resolvePath(child.node_path)" class="nest-menu" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: 'SidebarItem' // 自引用，必须定义 name 属性
});
</script>
<script lang="ts" setup>
import SubItem from '../SubItem/index';
import AppLink from '../Link/index.vue';
import { getUrl } from '../../../route/navMap';
interface Props {
  item: NavArrItem;
  isNest?: boolean;
};
const props = withDefaults(defineProps<Props>(), { isNest: false });
let onlyOneChild: any = null;
/**
 * 是否拥有要显示的子节点
 */
const hasOneShowingChild = (children: NavArrItem[], parent: NavArrItem) => {
  const showingChildren = children.filter((item) => {
    if (!item.is_show) {
      return false;
    } else {
      onlyOneChild = item;
      return true;
    }
  });
  // if (showingChildren.length === 1) {
  //   return true;
  // }
  if (showingChildren.length === 0) {
    onlyOneChild = {
      ...parent,
      node_path: '',
      noShowingChildren: true
    };
    return true;
  }
  return false;
};

const resolvePath = (path: string) => getUrl(path);
const isOne = computed(() => hasOneShowingChild((props.item as NavArrItem).part, (props.item as NavArrItem)));
</script>
