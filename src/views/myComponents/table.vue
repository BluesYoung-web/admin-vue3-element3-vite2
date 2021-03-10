<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:50:08
 * @LastEditTime: 2021-03-10 11:53:22
 * @Description: 自定义表格组件
-->
<template>
  <div class="filter-box">
    <div class="filter-item">
      <el-input placeholder="请输入uid" />
    </div>
    <div class="filter-item">
      <el-input placeholder="请输入手机号" />
    </div>
    <div class="filter-item">
      <el-input placeholder="请输入姓名" />
    </div>
    <div class="filter-item">
      <el-button type="primary">查询</el-button>
    </div>
  </div>
  <young-table class="list" :table-head="tableHead" :table-data="tableData" :table-height="700">
    <template #operate>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="scope">
          <div style="color: cyan;">我是操作{{ scope.row.autoid }}</div>
        </template>
      </el-table-column>
    </template>
  </young-table>
  <young-pagination v-model:page="query.page" v-model:limit="query.limit" :total="query.total" @page-change="pageChange" />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import YoungTable from '/components/YoungTable/index.vue';
import YoungPagination from '/components/YoungPagination/index.vue';

interface TableDataItem {
  date: string;
  autoid: number;
  sp: unknown;
  imgs: string[];
  m1: MultiRows[];
  m2: MultiRows[];
}

export default defineComponent({
  name: 'Table',
  components: { YoungTable, YoungPagination },
  setup() {
    let tableData: Ref<TableDataItem[]> = ref([]);
    let tableHead: Ref<TableHeadItem[]> = ref([]);
    tableHead.value = [
      { prop: 'date', label: '日期', tool_content: '来了老弟' },
      { prop: 'autoid', label: 'UID' },
      { prop: 'sp', label: '特殊内容' },
      { prop: 'imgs', label: '图片' },
      { prop: 'm1', label: '多行1' },
      { prop: 'm2', label: '多行2', show_all: true }
    ];

    tableData.value = [
      {
        date: '2021-01-01',
        autoid: 100,
        sp: `<el-button type="primary">123</el-button>`,
        imgs: ['12321', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        m1: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ],
        m2: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ]
      },
      {
        date: '2021-01-01',
        autoid: 100,
        sp: `<span style="color: red">来了老弟</span>`,
        imgs: ['12321', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        m1: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ],
        m2: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ]
      },
      {
        date: '2021-01-01',
        autoid: 100,
        sp: `<span style="color: red">来了老弟</span>`,
        imgs: ['12321', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        m1: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ],
        m2: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ]
      },
      {
        date: '2021-01-01',
        autoid: 100,
        sp: `<span style="color: red">来了老弟</span>`,
        imgs: ['12321', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        m1: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ],
        m2: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ]
      },
      {
        date: '2021-01-01',
        autoid: 100,
        sp: `<button>来了老弟</button>`,
        imgs: ['12321', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        m1: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ],
        m2: [
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 },
          { value: 1 }
        ]
      }
    ];

    const query = ref({
      page: 1,
      limit: 10,
      total: 100
    });

    const pageChange = () => console.log(query.value);

    return {
      tableData,
      tableHead,
      pageChange,
      query
    };
  }
});
</script>

<style lang="scss" scoped>
.list {
  margin-top: 30px;
}
.filter-box {
  display: flex;
  margin-bottom: 10px;
  .filter-item {
    margin-right: 10px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon {
      line-height: 33px;
    }
    .el-range__icon {
      line-height: 25px;
    }
    .el-range-separator {
      line-height: 26px;
    }
  }
}
</style>