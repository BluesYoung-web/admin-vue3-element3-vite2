<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:49:46
 * @LastEditTime: 2021-07-12 12:08:46
 * @Description: 角色列表
-->
<template>
  <div>
    <el-button type="primary" size="small" plain @click="isAddInfo=true">添加角色</el-button>
  </div>
  <!-- 角色列表 -->
  <el-table
    :data="tableData"
    style="width: 100%"
    size="medium"
    height="700"
  >
    <el-table-column prop="autoid" label="ID" />
    <el-table-column prop="parent_role_id" label="父角色ID" />
    <el-table-column prop="role_name" label="角色名称" />
    <el-table-column prop="role_desc" label="角色描述" />
    <el-table-column label="不启用/启用">
      <template #default="scope">
        <el-switch
          v-model="scope.row.is_enable"
          :active-value="1"
          :inactive-value="0"
          active-color="#409EFF"
          inactive-color="#909399"
          disabled
        />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template #default="scope">
        <p v-if="scope.row.autoid === 1">超管自动拥有所有权限</p>
        <div v-else>
          <el-button @click="editInfo(scope.row)">信息编辑</el-button>
          <el-button @click="editPriority(scope.row)" type="primary" plain>权限编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 信息 添加 | 编辑 -->
  <young-dialog
    width="400px"
    :is-add="isAddInfo"
    :is-edit="isEditInfo"
    @sure="sure"
    @clear="clear"
  >
    <template #body>
      <el-form :model="formInfo" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="formInfo.role_name" class="pr-5" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formInfo.role_desc" class="pr-5" />
        </el-form-item>
        <el-form-item label="父级角色id">
          <el-input v-model.number="formInfo.parent_role_id" :disabled="isEditInfo" class="pr-5" />
        </el-form-item>
        <el-form-item v-if="formInfo.autoid !== 1" label="禁用|启用">
          <el-radio v-model="formInfo.is_enable" :label="0">禁用</el-radio>
          <el-radio v-model="formInfo.is_enable" :label="1">启用</el-radio>
        </el-form-item>
      </el-form>
    </template>
  </young-dialog>
  <!-- 权限编辑 -->
  <young-dialog
    width="60vw"
    top="2vh"
    :is-edit="isEditPriority"
    @sure="surePriority"
    @clear="clear"
  >
    <template #body>
      <div class="h-720px overflow-auto">
        <el-table
          :data="nodeList"
          style="width: 100%; margin-bottom: 20px;"
          row-key="autoid"
          :default-expand-all="false"
          size="medium"
          :tree-props="{ children: 'part', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="node_name" label="节点名称" width="240">
            <template #default="scope">
              <el-checkbox v-model="scope.row.is_checked" :true-label="1" :false-label="0" @change="selectChange(scope.row)">{{ scope.row.node_name }}</el-checkbox>
            </template>
          </el-table-column>
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
        </el-table>
      </div>
    </template>
  </young-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { addRole, delRole, editRole, getRoleList, getRolePriorityList } from '../../api/system';
import deepClone from '../../util/deepClone';

const FORM_TEMP: Role = {
  autoid: 0,
  role_name: '',
  role_desc: '',
  parent_role_id: 0,
  is_enable: 1,
  role_access: ''
};
const formInfo = ref<Role>(deepClone(FORM_TEMP));
const tableData = ref<Role[]>([]);
const nodeList = ref<PriorityItem[]>([]);

const isAddInfo = ref(false);
const isEditInfo = ref(false);
const isEditPriority = ref(false);

const getList = async () => {
  const temp = await getRoleList();
  tableData.value = deepClone(temp);
};

const editInfo = (role: Role) => {
  formInfo.value = deepClone(role);
  isEditInfo.value = true;
};
/**
 * 生成节点映射
 */
const nodeMap = new Map<number, PriorityItem>();
const generateNodeMap = (list: PriorityItem[]) => {
  for (const node of list) {
    nodeMap.set(node.autoid, node);
    if (node.part.length > 0) {
      generateNodeMap(node.part);
    }
  }
};
/**
 * 编辑角色权限
 */
const editPriority = async (role: Role) => {
  const temp = await getRolePriorityList(role.autoid);
  let tn = await (temp as unknown as RolePriorityObj).list;
  nodeList.value = deepClone(tn);
  generateNodeMap(nodeList.value);
  formInfo.value = role;
  isEditPriority.value = true;
};
const del = (role: Role) => {
  ElMessageBox.confirm('确认删除该角色？', '提示', {
    type: 'warning'
  }).then(async () => {
    await delRole(role.autoid);
    ElMessage.success('删除成功！');
    getList();
  }).catch(() => null);
};
const clear = () => {
  isAddInfo.value = false;
  isEditInfo.value = false;
  isEditPriority.value = false;
  formInfo.value = deepClone(FORM_TEMP);
};
/**
 * 添加或修改角色信息
 */
const sure = async () => {
  if (isAddInfo.value) {
    await addRole(formInfo.value);
    ElMessage.success('角色添加成功！');
  } else {
    await editRole(formInfo.value);
    ElMessage.success('角色修改成功！');
  }
  clear();
  getList();
};
/**
 * 多级联动选择
 */
const selectChange = (item: PriorityItem) => {
  if (item.part.length !== 0) {
    item.part.forEach((v) => {
      v.is_checked = item.is_checked;
      selectChange(v);
    });
  }
  if (item.is_checked) {
    while (item.parent_id) {
      const tp = nodeMap.get(item.parent_id);
      if (tp) {
        item = tp;
        item && (item.is_checked = 1);
      } else {
        break;
      }
    }
  }
};
/**
 * 遍历列表，计算权限
 */
const generatePriority = (arr: PriorityItem[], pSet: Set<number>) => {
  if (arr.length !== 0) {
    arr.forEach((v) => {
      v.is_checked && pSet.add(v.autoid);
      generatePriority(v.part, pSet);
    });
  }
};
/**
 * 变更角色权限
 */
const surePriority = () => {
  const pSet: Set<number> = new Set();
  generatePriority(nodeList.value, pSet);
  formInfo.value.role_access = [...pSet].join(',');
  sure();
};
getList();
</script>
