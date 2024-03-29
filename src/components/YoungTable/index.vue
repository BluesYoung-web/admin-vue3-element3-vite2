<!--
 * @Author: zhangyang
 * @Date: 2021-03-01 16:41:54
 * @LastEditTime: 2021-09-17 11:43:39
 * @Description: 自定义表格组件
-->
<template>
  <el-table
    v-bind="$attrs"
    ref="tableRef"
    :data="tableData"
    style="width: 100%"
    size="medium"
    :height="tableHeight || height"
    @sort-change="$emit('sort-change', $event)"
  >
    <el-table-column
      v-for="(item, index) in tableHead"
      :key="index"
      :prop="String(item.prop)"
      :label="item.label"
      :width="item.width || ''"
      :sortable="item.sortable || false"
      :fixed="item.fixed || false"
      :align="item.aligin || 'left'"
    >
      <template #header="scope">
        <span v-if="tableHead[scope.$index].tool_content && !tableHead[scope.$index].only_export">
          <span>{{ scope.column.label }}</span>
          <el-tooltip class="item" placement="bottom">
            <template #content>
              <div v-html="tableHead[scope.$index].tool_content" />
            </template>
            <el-icon color="#1890ff">
              <warning />
            </el-icon>
          </el-tooltip>
        </span>
        <span v-if="!tableHead[scope.$index].tool_content && !tableHead[scope.$index].only_export">{{ scope.column.label }}</span>
      </template>
      <template #default="scope">
        <!-- 普通内容 -->
        <span v-if="!(scope.row[item.prop] instanceof Array)" v-html="scope.row[item.prop]" />
        <span v-else>
          <!-- 图片 -->
          <span v-if="String(item.prop).indexOf('imgs') === 0">
            <el-image
              v-for="(it, id) in scope.row[item.prop]"
                :key="Number(id)"
                :src="it"
                :preview-src-list="scope.row[item.prop]"
                class="w-50px h-50px mr-5px"
            >
              <template #error class="image-slot">
                <el-icon>
                  <picture-filled style="font-size: 50px" class="w-50px h-50px mr-5px" />
                </el-icon>
              </template>
            </el-image>
          </span>
          <!-- 多行 -->
          <span v-else>
            <div v-for="(value, i) in scope.row[item.prop]" :key="Number(i)">
                <!-- 全部显示 -->
                <span v-if="item.show_all">
                  {{ (value.before || '') + value.value + (value.after || '') }}
                </span>
                <!-- 部分显示 -->
                <span v-else>
                  <span v-if="Number(i) < 3">{{ (value.before || '') + value.value + (value.after || '') }}</span>
                  <span v-if="i === 3">......</span>
                </span>
              </div>
          </span>
        </span>
      </template>
    </el-table-column>
    <!-- 预留插槽 -->
    <slot name="switch" />
    <slot name="operate" />
  </el-table>
</template>
<script lang="ts" setup>
import { Warning, PictureFilled } from '@element-plus/icons';
interface Props {
  tableData: TableDataItem<any>[];
  tableHead: TableHeadItem<any>[];
  tableHeight?: number;
};
const props = defineProps<Props>();
/**
 * 定义事件
 */
const emit = defineEmits<{ (e: 'sort-change', event: any): void; }>();
/**
 * 引用表格元素
 */
const tableRef = ref<any>(null);
// 修复表格切换时，显示出现错位的 bug
onActivated(() => {
  nextTick(() => {
    tableRef.value.doLayout();
  });
});
/**
 * 默认表格高度
 */
const height = computed(() => document.body.clientHeight - 84 - 72 - 32 - 32 - 44);
</script>
