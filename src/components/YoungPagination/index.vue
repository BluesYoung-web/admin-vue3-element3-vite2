<!--
 * @Author: zhangyang
 * @Date: 2021-03-02 15:41:33
 * @LastEditTime: 2021-07-05 14:38:04
 * @Description: 分页组件
-->
<template>
  <div class="bg-white pt-20px">
    <el-pagination
      :background="background"
      :current-page="page"
      :page-size="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  total: number;
  page: number;
  limit: number;
  pageSizes?: number[];
  layout?: string;
  background?: boolean;
  autoScroll?: boolean;
  hidden?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false
});
const emit = defineEmits(['page-change', 'update:page', 'update:limit']);
const sizeChange = (val: number) => {
  emit('update:page', 1);
  emit('update:limit', val);
};
const pageChange = (val: number) => {
  emit('update:page', val);
  emit('page-change');
};
</script>
