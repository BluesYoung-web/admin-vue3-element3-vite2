<!--
 * @Author: zhangyang
 * @Date: 2021-03-23 17:34:05
 * @LastEditTime: 2021-03-25 11:01:17
 * @Description: 选项卡组件
-->
<template>
  <el-tabs v-model="tab" v-bind="$attrs" @tab-click="switchTab">
    <el-tab-pane
      v-for="(item, index) in tabsMenu"
      :key="index + '3223dsf4r'"
      :label="item.label"
      :name="item.name"
    >
      <slot :name="item.name" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
interface TabItem {
  label: string;
  name: string;
}
export default defineComponent({
  name: 'YoungTabs',
  props: {
    modelValue: { type: String, required: true },
    tabsMenu: { type: Object as PropType<TabItem[]>, required: true }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const tab = ref(props.modelValue);
    const switchTab = (tab1: any) => {
      emit('update:modelValue', (tab1.props as unknown as TabItem).name);
    };
    return {
      tab,
      switchTab
    };
  }
});
</script>