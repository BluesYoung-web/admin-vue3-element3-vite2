<!--
 * @Author: zhangyang
 * @Date: 2021-03-23 17:34:05
 * @LastEditTime: 2021-07-05 14:26:18
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

<script lang="ts" setup>
import { ref } from 'vue';
interface TabItem {
  label: string;
  name: string;
};
interface Props {
  modelValue: string;
  tabsMenu: TabItem[];
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const tab = ref(props.modelValue);
const switchTab = (tab1: any) => emit('update:modelValue', (tab1.props as unknown as TabItem).name);
</script>
