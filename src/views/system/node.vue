<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:49:25
 * @LastEditTime: 2021-07-06 10:17:01
 * @Description: 节点列表
-->
<template>
  <div class="index">
    <div class="caozuoFat">
      <el-button type="primary" size="small" plain @click="add(0)">添加一级节点</el-button>
    </div>
    <!-- 节点列表 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px;"
      size="medium"
      :tree-props="{ children: 'part', hasChildren: 'hasChildren' }"
      row-key="autoid"
      :expand-row-keys="[...expandKeys]"
      @expand-change="expandChange"
    >
      <el-table-column prop="node_name" label="节点名称" width="240" />
      <el-table-column prop="autoid" label="ID" />
      <el-table-column prop="parent_id" label="父节点" />
      <el-table-column prop="node_path" label="路径" />
      <el-table-column prop="node_desc" label="节点描述" />
      <el-table-column prop="is_show" label="隐藏/显示">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_show"
            :active-value="1"
            :inactive-value="0"
            active-color="#409EFF"
            inactive-color="#909399"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column prop="node_type" label="节点级别" />
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
          <el-button
            v-if="scope.row.node_type < 4"
            type="success"
            plain
            @click="add(scope.row)"
          >添加子节点</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 / 编辑 -->
    <young-dialog
      width="370px"
      :is-add="isAdd"
      :is-edit="isEdit"
      @sure="sure"
      @clear="clear"
    >
      <template #body>
        <el-form :model="form" label-width="80px">
          <el-form-item label="节点名称">
            <el-input v-model="form.node_name" />
          </el-form-item>
          <el-form-item label="节点描述">
            <el-input v-model="form.node_desc" />
          </el-form-item>
          <el-form-item label="节点路径">
            <el-input v-model="form.node_path" />
          </el-form-item>
          <el-form-item label="排序(升序)">
            <el-input v-model.number="form.node_sort" />
          </el-form-item>
          <el-form-item label="显示|隐藏">
            <el-radio v-model="form.is_show" :label="0">隐藏</el-radio>
            <el-radio v-model="form.is_show" :label="1">显示</el-radio>
          </el-form-item>
          <el-form-item label="父节点ID">
            <el-input v-model="form.parent_id" disabled />
          </el-form-item>
        </el-form>
      </template>
    </young-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getNodeList, addNode, editNode, delNode } from '../../api/system';
import deepClone from '../../util/deepClone';
import { isArray } from '../../util/isType';
const FORM_TEMP: AddNodeItem = {
  autoid: 0,
  node_name: '',
  node_desc: '',
  node_path: '',
  node_sort: 0,
  is_show: 1,
  parent_id: 0
};
const isAdd = ref(false);
const isEdit = ref(false);
// key 的类型必须为 string 才会生效！！！
const expandKeys = ref<Set<string>>(new Set());
let tempArr: string[] = [];
const getFatherAndSon = (arr: NavArrItem[], num?: number): string[] => {
  if (num === 1) {
    tempArr = [];
  }
  for (const item of arr) {
    tempArr.push(item.autoid + '');
    if (isArray(item.part) && item.part.length > 0) {
      getFatherAndSon(deepClone(item.part));
    }
  }
  return tempArr;
};
const expandChange = (...args: any) => {
  const [row, isOpen] = args as [NavArrItem, boolean];
  const autoid = row.autoid;
  if (isOpen) {
    expandKeys.value.add(autoid + '');
  } else {
    const allSub = getFatherAndSon([row], 1);
    allSub.forEach((v) => expandKeys.value.delete(v));
  }
};
const form = ref<AddNodeItem>(deepClone(FORM_TEMP));
let tableData = ref<NavArrItem[]>([]);
/**
 * 获取节点列表
 */
const getList = async () => {
  sessionStorage.setItem('system_open_keys', JSON.stringify([...expandKeys.value]));
  const temp = await getNodeList();
  tableData.value = deepClone(temp);
  const res = sessionStorage.getItem('system_open_keys') as string;
  expandKeys.value = new Set(JSON.parse(res));
};
onMounted(() => getList());
/**
 * 添加节点
 */
const add = (parent: any) => {
  let parent_id = 0;
  if (typeof parent === 'object') {
    if (parent.node_type === 3) {
      form.value.is_show = 0;
    }
    parent_id = parent.autoid;
  }
  form.value.parent_id = parent_id;
  isAdd.value = true;
};
/**
 * 编辑节点
 */
const edit = async (nav: NavArrItem) => {
  isEdit.value = true;
  form.value = nav;
  form.value.node_id = nav.autoid;
};

/**
 * 删除节点
 */
const del = (nav: NavArrItem) => {
  ElMessageBox.confirm('确认删除该节点？', '提示', {
    type: 'warning'
  }).then(async () => {
    await delNode(nav.autoid);
    ElMessage.success('节点删除成功！');
    getList();
  }).catch(() => null);
};
const clear = () => {
  isAdd.value = false;
  isEdit.value = false;
  form.value = deepClone(FORM_TEMP);
  tableData.value = [];
  getList();
};
const sure = async () => {
  if (isAdd.value) {
    await addNode(form.value);
    ElMessage.success('节点添加成功！');
  } else if (isEdit.value) {
    await editNode(form.value as EditNodeItem);
    ElMessage.success('节点修改成功！');
  }
  clear();
};
</script>
