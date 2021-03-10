<!--
 * @Author: zhangyang
 * @Date: 2021-02-26 11:49:25
 * @LastEditTime: 2021-03-10 10:06:40
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
      row-key="autoid"
      :default-expand-all="false"
      size="medium"
      :tree-props="{ children: 'part', hasChildren: 'hasChildren' }"
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
            @click="add(scope.row.autoid)"
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
        <div class="tjglyFat">
        <div class="disF"><span>节点名称</span>
          <el-input v-model="form.node_name" />
        </div>
        <div class="disF"><span>节点描述</span>
          <el-input v-model="form.node_desc" />
        </div>
        <div class="disF"><span>节点路径</span>
          <el-input v-model.trim="form.node_path" />
        </div>
        <div class="disF"><span>排序(升序)</span>
          <el-input v-model="form.node_sort" />
        </div>
        <div class="disF"><span>显示|隐藏</span>
          <div class="mar7">
            <el-radio v-model="form.is_show" :label="0">隐藏</el-radio>
            <el-radio v-model="form.is_show" :label="1">显示</el-radio>
          </div>
        </div>
        <div class="disF"><span>父节点ID</span>
          <el-input v-model="form.parent_id" disabled />
        </div>
      </div>
      </template>
    </young-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getNodeList, addNode, editNode, delNode } from '../../api/system';
import deepClone from '../../util/deepClone';
import YoungDialog from '/components/YoungDialog/index.vue';

export default defineComponent({
  name: 'Node',
  components: {
    YoungDialog
  },
  setup() {
    let isAdd = ref(false);
    let isEdit = ref(false);
    const form: Ref<AddNodeItem> = ref({
      autoid: 0,
      node_name: '',
      node_desc: '',
      node_path: '',
      node_sort: 0,
      is_show: 1,
      parent_id: 0
    });
    let tableData: Ref<NavArrItem[]> = ref([]);
    /**
     * 获取节点列表
     */
    const getList = async () => {
      const temp = await getNodeList();
      tableData.value = deepClone(temp);
    };
    onMounted(() => getList());
    /**
     * 添加节点
     */
    const add = (parent_id = 0) => {
      isAdd.value = true;
      form.value.parent_id = parent_id;
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
      form.value = {
        autoid: 0,
        node_name: '',
        node_desc: '',
        node_path: '',
        node_sort: 0,
        is_show: 1,
        parent_id: 0
      }
      tableData.value = [];
      getList();
    }
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
    return {
      add,
      edit,
      del,
      sure,
      clear,
      form,
      tableData,
      isAdd,
      isEdit
    };
  }
});
</script>

<style scoped lang="scss">
  .index {
    .tjglyFat {
      .disF {
        margin-bottom: 10px;

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
</style>
