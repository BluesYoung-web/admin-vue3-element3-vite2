<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:50:08
 * @LastEditTime: 2021-03-03 10:14:04
 * @Description: 管理员列表
-->
<template>
  <div>
    <young-table :table-head="tableHead" :table-data="tableData" :table-height="600">
      <template #operate>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <div style="color: cyan;">我是操作{{ scope.row.autoid }}</div>
          </template>
        </el-table-column>
      </template>
    </young-table>
    <young-pagination v-model:page="query.page" v-model:limit="query.limit" :total="query.total" @page-change="pageChange" />
    <young-img-upload v-model:imgs="imgs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import YoungTable from '/components/YoungTable/index.vue';
import YoungPagination from '/components/YoungPagination/index.vue';
import YoungImgUpload from '/components/YoungImgUpload/index.vue';

interface TableDataItem {
  date: string;
  autoid: number;
  sp: unknown;
  imgs: string[];
  m1: MultiRows[];
  m2: MultiRows[];
}

export default defineComponent({
  name: 'Admin',
  components: { YoungTable, YoungPagination, YoungImgUpload },
  setup() {
    let tableData: Ref<TableDataItem[]> = ref([]);
    let tableHead: Ref<TableHeadItem[]> = ref([]);
    let imgs = ref([]);
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
      query,
      imgs
    };
  }
});
</script>