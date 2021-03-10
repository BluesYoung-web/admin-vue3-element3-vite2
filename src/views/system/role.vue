<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:49:46
 * @LastEditTime: 2021-03-10 10:29:55
 * @Description: 角色列表
-->
<template>
  <div class="index">
    <div class="caozuoFat">
      <el-button type="primary" size="small" plain @click="add">添加角色</el-button>
    </div>
    <!-- 角色列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      size="medium"
      height="700"
      class="tableHet"
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
          <el-button @click="editInfo(scope.row)">信息编辑</el-button>
          <el-button @click="editPriority(scope.row)" type="primary" plain>权限编辑</el-button>
          <el-button v-if="+scope.row.autoid !== 1" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 信息 添加 | 编辑 -->
    <young-dialog
      width="370px"
      :is-add="isAddInfo"
      :is-edit="isEditInfo"
      @sure="sure"
      @clear="clear"
    >
      <template #body>
        <div class="tjglyFat">
        <div class="disF"><span>角色名称</span>
          <el-input v-model="formInfo.role_name" class="len" />
        </div>
        <div class="disF"><span>角色描述</span>
          <el-input v-model="formInfo.role_desc" class="len" />
        </div>
        <div class="disF"><span>父级角色id</span>
          <el-input v-model.number="formInfo.parent_role_id" :disabled="isEditInfo" class="len" />
        </div>
        <div class="disF"><span>禁用|启用</span>
          <div class="mar7">
            <el-radio v-model="formInfo.is_enable" :label="0">禁用</el-radio>
            <el-radio v-model="formInfo.is_enable" :label="1">启用</el-radio>
          </div>
        </div>
        <div class="disF"><span>选择后台</span>
          <div class="mar7">
            <el-radio v-model="formInfo.platform_type" :label="0">管理后台</el-radio>
            <el-radio v-model="formInfo.platform_type" :label="1">商户后台</el-radio>
          </div>
        </div>
      </div>
      </template>
    </young-dialog>
    <!-- 权限编辑 -->
    <young-dialog
      width="60vw"
      top="10vh"
      :is-edit="isEditPriority"
      @sure="surePriority"
      @clear="clear"
    >
      <template #body>
        <div class="tjglyFat checkssss pd">
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
                <el-checkbox v-model="scope.row.is_checked" @change="selectChange(scope.row)">{{ scope.row.node_name }}</el-checkbox>
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
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { addRole, delRole, editRole, getRoleList, getRolePriorityList } from '../../api/system';
import deepClone from '../../util/deepClone';
import YoungDialog from '/components/YoungDialog/index.vue';
export default defineComponent({
  name: 'Role',
  components: {
    YoungDialog
  },
  setup() {
    let formInfo: Ref<Role> = ref({
      autoid: 0,
      role_name: '',
      role_desc: '',
      parent_role_id: 0,
      is_enable: 1,
      platform_type: 0,
      role_access: ''
    });
    let tableData: Ref<Role[]> = ref([]);
    let nodeList: Ref<PriorityItem[]> = ref([]);
    let isAddInfo = ref(false);
    let isEditInfo = ref(false);
    let isEditPriority = ref(false);

    const getList = async () => {
      const temp = await getRoleList();
      tableData.value = deepClone(temp);
    };
    onMounted(() => getList());
    /**
     * 添加角色
     */
    const add = async () => {
      isAddInfo.value = true;
    };
    /**
     * 编辑角色信息
     */
    const editInfo = (role: Role) => {
      formInfo.value = role;
      isEditInfo.value = true;
    };
    /**
     * 编辑角色权限
     */
    const editPriority = async (role: Role) => {
      const temp = await getRolePriorityList(role.autoid);
      let tn = await (temp as unknown as RolePriorityObj).nodeList;
      tn.forEach((v) => {
        if (v.is_checked) {
          v.is_checked = true;
        }
        selectChange(v, true);
      });
      nodeList.value = deepClone(tn);
      formInfo.value = role;
      isEditPriority.value = true;
    };
    /**
     * 删除角色
     */
    const del = (role: Role) => {
      ElMessageBox.confirm('确认删除该角色？', '提示', {
        type: 'warning'
      }).then(async () => {
        await delRole(role.autoid);
        ElMessage.success('删除成功！');
        getList();
      }).catch(() => null);
    };

    /**
     * 清除编辑
     */
    const clear = () => {
      isAddInfo.value = false;
      isEditInfo.value = false;
      isEditPriority.value = false;
      formInfo.value = {
        autoid: 0,
        role_name: '',
        role_desc: '',
        role_access: '',
        parent_role_id: 0,
        is_enable: 1,
        platform_type: 0
      };
      tableData.value = [];
      getList();
    };
    /**
     * 提交编辑
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
    };
    
    /**
     * 多级联动选择
     */
    const selectChange = (item: PriorityItem, reverse: boolean = false) => {
      if (item.part.length !== 0) {
        item.part.forEach((v) => {
          if (reverse) {
            if (v.is_checked) {
              v.is_checked = true;
            } else {
              v.is_checked = false;
            }
          } else {
            if (item.is_checked) {
              v.is_checked = true;
            } else {
              v.is_checked = false;
            }
          }
          selectChange(v, reverse);
        });
      }
    };
    /**
     * 遍历列表，计算权限
     */
    const generatePriority = (arr: PriorityItem[], pSet: Set<number>) => {
      if (arr.length !== 0) {
        arr.forEach((v) => {
          if (v.is_checked) {
            pSet.add(v.autoid);
          }
          generatePriority(v.part, pSet);
        });
      }
    };
    const surePriority = () => {
      const pSet: Set<number> = new Set();
      generatePriority(nodeList.value, pSet);
      formInfo.value.role_access = [...pSet].join(',');
      sure();
    };
    return {
      tableData,
      nodeList,
      formInfo,
      isAddInfo,
      isEditInfo,
      isEditPriority,
      add,
      editInfo,
      editPriority,
      del,
      sure,
      clear,
      selectChange,
      surePriority
    };
  }
});
</script>

<style lang="scss" scoped>
.index {
  .tjglyFat {
    .disF {
      margin-bottom: 10px;
      display: flex;
      >span {
        width: 80px;
        min-width: 80px;
        line-height: 32px;
        text-align: right;
        margin-right: 15px;
      }

      .switchTop {
        margin-top: 6px
      }
    }

    .el-input__suffix-inner {
      margin-right: 0 !important;
    }

    .mar7 {
      margin-top: 7px;
    }
  }
}
.checkssss .el-checkbox__label{
  color: #606266 !important
}

.len {
  width: 220px;
}

.pd {
  height: 60vh;
  overflow: auto;
}
</style>