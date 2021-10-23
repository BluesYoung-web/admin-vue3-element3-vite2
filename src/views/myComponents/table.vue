<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:50:08
 * @LastEditTime: 2021-10-23 16:16:22
 * @Description: 自定义表格组件
-->
<template>
  <div class="filter-box">
    <div class="filter-item">
      <el-input v-model="uid" v-debounce="inputObj" placeholder="请输入uid" />
    </div>
    <div class="filter-item">
      <el-input placeholder="请输入手机号" />
    </div>
    <div class="filter-item">
      <el-input placeholder="请输入姓名" />
    </div>
    <div class="filter-item">
      <el-button v-throttle="debounceSearchObj" type="primary" @click="getList">查询</el-button>
    </div>
    <div class="filter-item">
      <el-button type="success" @click="exportHandler">导出</el-button>
    </div>
  </div>
  <young-table class="mt-30px" :table-head="tableHead" :table-data="tableData" :table-height="700" @sort-change="log">
    <template #operate>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="scope">
          <el-button type="primary">通过插槽放入</el-button>
        </template>
      </el-table-column>
    </template>
  </young-table>
  <young-pagination v-model:page="query.page" v-model:limit="query.limit" :total="query.total" @page-change="getList" />
</template>

<script lang="ts" setup>
interface Head {
  date: string,
  autoid: number,
  sp: string,
  imgs: string[],
  m1: MultiRowItem[],
  m2: MultiRowItem[]
};
const tableData = ref<TableDataItem<Head>[]>([]);
const tableHead = ref<TableHeadItem<Head>[]>([]);
tableHead.value = [
  { prop: 'date', label: '日期', tool_content: '直接使用原生html' },
  { prop: 'autoid', label: 'UID' },
  { prop: 'sp', label: '特殊内容', sortable: true },
  { prop: 'imgs', label: '图片' },
  { prop: 'm1', label: '多行(自动隐藏)' },
  { prop: 'm2', label: '多行(全部展示)', show_all: true }
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
    sp: `<span style="color: red">直接使用原生html</span>`,
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
    sp: `<span style="color: red">直接使用原生html</span>`,
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
    sp: `<span style="color: red">直接使用原生html</span>`,
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
    autoid: 123,
    sp: `<span style="color: red">直接使用原生html</span>`,
    imgs: ['1', '2', '3'],
    m1: [{ value: '111' }],
    m2: [{ value: '111' }],
  }
];

const query = ref({
  page: 1,
  limit: 10,
  total: 100
});
const getList = () => console.log(query.value);
const debounceSearchObj: ThrottleValue = {
  listener: 'click',
  delay: 1000,
  cbk: console.log
};
const inputObj: DeBounceValue = {
  listener: 'input',
  delay: 100,
  cbk: console.log
};
const uid = ref('');
const log = console.log;

const exportHandler = async () => {
  // 懒加载分包
  const { youngExport } = await import('../../util/youngExport');
  youngExport({ filename: '导出测试', tableHead: tableHead.value, tableData: tableData.value });
};
</script>
