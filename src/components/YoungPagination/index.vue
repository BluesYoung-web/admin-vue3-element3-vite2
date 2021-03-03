<!--
 * @Author: zhangyang
 * @Date: 2021-03-02 15:41:33
 * @LastEditTime: 2021-03-02 17:19:11
 * @Description: 分页组件
-->
<template>
  <div class="pagination-container">
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

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
export default defineComponent({
  name: 'YoungPagination',
  props: {
    total: { type: Number, required: true },
    page: { type: Number, required: true },
    limit: { type: Number, required: true },
    pageSizes: { type: Array, default: (() => [10, 20, 30, 50]) },
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
    background: { type: Boolean, default: true },
    autoScroll: { type: Boolean, default: true },
    hidden: { type: Boolean, default: false }
  },
  emits: ['page-change', 'update:page', 'update:limit'],
  setup(props, { emit }) {
    const sizeChange = (val: number) => {
      emit('update:page', 1);
      emit('update:limit', val);
    };
    const pageChange = (val: number) => {
      emit('update:page', val);
      emit('page-change');
    };
    return {
      ...toRefs(props),
      sizeChange,
      pageChange
    };
  }
});
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding-top:20px;
}
</style>
