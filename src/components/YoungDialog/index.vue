<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:51:05
 * @LastEditTime: 2021-03-29 17:50:01
 * @Description: 弹出层组件，封装常用的按钮
-->
<template>
  <teleport to='body'>
    <el-dialog
      :model-value="modelValue || showDialog"
      v-bind="$attrs"
      :title="realTitle || title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="beforeClose"
    >
      <slot name="body" />
      <template #footer>
        <slot name="button" />
        <el-button size="mini" @click="beforeClose">{{ cancelText }}</el-button>
        <slot name="step1" />
        <slot name="step2" />
        <el-button v-show="showSure" size="mini" type="primary" @click="sure">{{ sureText }}</el-button>
      </template>
    </el-dialog>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'YoungDialog',
  props: {
    modelValue: { type: Boolean, default: false },
    realTitle: { type: String, default: '' },
    sureText: { type: String, default: '确 定' },
    cancelText: { type: String, default: '取 消' },
    showSure: { type: Boolean, default: true },
    isAdd: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
    isMore: { type: Boolean, default: false }
  },
  emits: ['sure', 'clear', 'update:modelValue'],
  setup(props, { emit }) {
    const title = computed(() => {
      let str = '新建';
      if (props.isEdit) {
        str = '编辑';
      }
      if (props.isMore) {
        str = '详情';
      }
      return str;
    });
    const showDialog = computed({
      get: () => props.isAdd || props.isMore || props.isEdit,
      set: (v) => null
    });

    const sure = () => {
      if (props.isMore) {
        emit('clear');
        return;
      }
      emit('update:modelValue', false);
      emit('sure');
    };
    const beforeClose = () => {
      if (props.isMore) {
        emit('clear');
        return;
      }
      ElMessageBox.confirm('数据未保存，关闭将丢失数据，确认关闭？', '提示').then(() => {
        emit('update:modelValue', false);
        emit('clear');
      }).catch(() => null);
    };

    return {
      ...toRefs(props),
      title,
      showDialog,
      sure,
      beforeClose
    };
  }
});
</script>
