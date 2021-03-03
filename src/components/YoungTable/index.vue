<!--
 * @Author: zhangyang
 * @Date: 2021-03-01 16:41:54
 * @LastEditTime: 2021-03-03 09:11:10
 * @Description: 自定义表格组件
-->
<template>
  <el-table
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
      :prop="item.prop"
      :label="item.label"
      :width="item.width || ''"
      :sortable="item.sortable || false"
      :fixed="item.fixed || false"
      :align="item.aligin || 'left'"
    >
      <template #header="scope">
        <div v-if="tableHead[scope.$index].tool_content">
            <span>{{ scope.column.label }}</span>
            <el-tooltip class="item" effect="dark" placement="bottom">
              <template #content>
                <div v-html="tableHead[scope.$index].tool_content" />
              </template>
              <i class="el-icon-warning-outline" style="margin: 0px;color: #1890ff;" />
            </el-tooltip>
          </div>
          <div v-else>{{scope.column.label}}</div>
      </template>
      <template #default="scope">
        <!-- 普通内容 -->
        <span v-if="!(scope.row[item.prop] instanceof Array)" v-html="scope.row[item.prop]" />
        <span v-else>
          <!-- 图片 -->
          <span v-if="item.prop === 'imgs'">
            <el-image
              v-for="(it, id) in scope.row.imgs"
                :key="id"
                :src="it"
                :preview-src-list="scope.row.imgs"
                class="img"
              >
                <template #error class="image-slot">
                  <i style="font-size: 50px" class="el-icon-picture-outline img" />
                </template>
              </el-image>
          </span>
          <!-- 多行 -->
          <span v-else>
            <div v-for="(value, i) in scope.row[item.prop]" :key="i">
                <!-- 全部显示 -->
                <span v-if="item.show_all">
                  {{ (value.before || '') + value.value + (value.after || '') }}
                </span>
                <!-- 部分显示 -->
                <span v-else>
                  <span v-if="i < 3">{{ (value.before || '') + value.value + (value.after || '') }}</span>
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

<script lang="ts">
import { RefElement } from 'element-plus/lib/el-popper/src/use-popper';
import { computed, defineComponent, nextTick, onActivated, PropType, Ref, ref, toRefs } from 'vue';
enum TableHeadAligin { 'left', 'center', 'right' }

interface TableHeadItem {
  prop: string;
  label: string;
  width?: string;
  sortable?: boolean;
  fixed?: boolean;
  aligin?: TableHeadAligin;
  show_all?: boolean;
  tool_content?: string;
}
export default defineComponent({
  name: 'YoungTable',
  props: {
    tableData: { type: Array, required: true },
    tableHead: { type: Object as PropType<TableHeadItem[]>, required: true },
    tableHeight: { type: Number, default: 0 }
  },
  emits: ['sort-change'],
  setup(props, { emit }) {
    const tableRef: Ref<RefElement> = ref(null);
    let height = ref(500);
    /**
     * 修复表格切换时，显示出现错位的 bug
     */
    onActivated(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
    });

    computed(() => {
      height.value = document.body.clientHeight - 84 - 72 - 32 - 32 - 44;
    });
    return {
      ...toRefs(props),
      tableRef,
      height
    };
  }
});
</script>

<style lang='scss' scope>
.img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}
</style>
