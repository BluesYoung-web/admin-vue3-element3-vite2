<!--
 * @Author: zhangyang
 * @Date: 2021-03-20 16:46:54
 * @LastEditTime: 2021-09-03 17:36:31
 * @Description: 管理员列表
-->
<template>
  <div class="filter-box">
    <div class="filter-item">
      <el-input v-model.trim="query.name" placeholder="请输入用户名" />
    </div>
    <div class="filter-item">
      <el-input v-model.trim="query.phone" placeholder="请输入手机号" />
    </div>
    <div class="filter-item">
      <el-input v-model.trim="query.real_name" placeholder="请输入真实姓名" />
    </div>
    <div class="filter-item">
      <el-button type="primary" @click="getList">查询</el-button>
    </div>
    <div class="filter-item">
      <el-button type="success" @click="addUser">新建</el-button>
    </div>
  </div>
  <div class="mt-30px">
    <young-table :table-head="tableHead" :table-data="tableData">
      <template #switch>
        <el-table-column label="禁用/启用" fixed="right" width="120">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#409EFF"
              inactive-color="#909399"
              :disabled="true"
            />
          </template>
        </el-table-column>
      </template>
      <template #operate>
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button v-if="+scope.row.autoid !== 1" type="danger" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </young-table>
  </div>
  <young-pagination v-show="query.total > 0" :total="query.total" v-model:page="query.page" v-model:limit="query.limit" @page-change="getList" />
  <young-dialog
    :is-add="isAdd"
    :is-edit="isEdit"
    width="600px"
    @sure="sure"
    @clear="clear"
  >
    <template #body>
      <el-form ref="refForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" :prop="isAdd ? 'pwd' : ''">
          <el-input v-model.trim="form.pwd" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model.trim="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model.trim="form.real_name" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in roleArr"
              :key="index + 'eweqe432'"
              :value="item.autoid"
              :label="item.role_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="form.is_enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#409EFF"
            inactive-color="#909399"
          />
        </el-form-item>
      </el-form>
    </template>
  </young-dialog>
</template>

<script lang="ts" setup>
import type { FormRulesMap } from 'element-plus/es/components/form/src/form.type';
import { addAdminUserInfo, changeAdminState, editAdminUserInfo, getAdminInfo, getAdminList } from '../../api/system';
interface Query{
  name: string;
  phone: string;
  real_name: string;
  page: number;
  limit: number;
  total: number;
};
interface Head {
  autoid: number;
  admin_name: string;
  real_name: string;
  phone_number: string;
  create_time: string;
  login_time: string;
  login_ip: string;
  last_time: string;
  role_des: string;
};
const QUERY_TEMP: Query = {
  name: '',
  real_name: '',
  phone: '',
  page: 1,
  limit: 10,
  total: 0
};
interface User_Info {
  admin_id: number;
  name: string;
  pwd: string;
  phone: string;
  real_name: string;
  role: number;
  is_enable: 0 | 1;
}
const FORM_TEMP: User_Info = {
  admin_id: 0,
  name: '',
  pwd: '',
  phone: '',
  real_name: '',
  role: 1,
  is_enable: 1
};

const refForm = ref<any>(null);
const query = ref<Query>(deepClone(QUERY_TEMP));
const tableHead = ref<TableHeadItem<Head>[]>([
  { prop: 'autoid', label: 'id', width: '80' },
  { prop: 'admin_name', label: '账号', width: '120' },
  { prop: 'real_name', label: '真实姓名' },
  { prop: 'phone_number', label: '手机号' },
  { prop: 'create_time', label: '创建时间' },
  // { prop: 'login_time', label: '登录时间' },
  // { prop: 'login_ip', label: '登录IP' },
  // { prop: 'last_time', label: '最后登录时间' },
  { prop: 'role_des', label: '角色' }
]);
const tableData = ref<TableDataItem<Head>[]>([]);
const getList = async () => {
  const { list, total } = await getAdminList(query.value) as unknown as any;
  tableData.value = list;
  query.value.total = total;
};
const init = () => {
  query.value = deepClone(QUERY_TEMP);
  getList();
};

const delUser = async (row: any) => {
  ElMessageBox.confirm('确认删除该管理员？', '提示', {
    type: 'warning'
  }).then(async () => {
    await changeAdminState(row.autoid);
    ElMessage.success('删除成功！');
    init();
  }).catch(() => null);
};

const isAdd = ref(false);
const isEdit = ref(false);
const form = ref<User_Info>(deepClone(FORM_TEMP));
const rules: FormRulesMap = {
  name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  real_name: [{ required: true, trigger: 'blur', message: '请输入真实姓名' }],
  pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  role: [{ required: true, trigger: 'change', message: '请至选择角色' }]
};
const roleArr = ref<{
  autoid: number;
  role_name: string;
}[]>([]);

const addUser = async () => {
  const role_list = await getAdminInfo();
  roleArr.value = deepClone(role_list);
  isAdd.value = true;
};
const editUser = async (row: any) => {
  const role_list = await getAdminInfo() as unknown as any;
  console.log(role_list);
  roleArr.value = deepClone(role_list);
  form.value = deepClone(row);
  isEdit.value = true;
};
const sure = () => {
  refForm.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (isAdd.value) {
        await addAdminUserInfo(form.value);
        ElMessage.success('管理员添加成功！');
      }
      if (isEdit.value) {
        await editAdminUserInfo(form.value);
        ElMessage.success('修改成功！');
      }
      clear();
      setTimeout(() => init(), 500);
    }
  });
};
const clear = () => {
  isAdd.value = false;
  isEdit.value = false;
  form.value = deepClone(FORM_TEMP);
};

init();
</script>
