<!--
 * @Author: zhangyang
 * @Date: 2021-03-02 15:41:33
 * @LastEditTime: 2021-09-07 16:50:28
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
interface Emits {
  (e: 'page-change'): void;
  (e: 'update:page', v: number): void;
  (e: 'update:limit', v: number): void;
};
const emit = defineEmits<Emits>();
const sizeChange = (val: number) => {
  emit('update:page', 1);
  emit('update:limit', val);
  emit('page-change');
};
const pageChange = (val: number) => {
  emit('update:page', val);
  emit('page-change');
};
</script>
