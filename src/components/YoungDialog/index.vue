<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:51:05
 * @LastEditTime: 2021-08-27 10:14:18
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
<script lang="ts" setup>
interface Props {
  modelValue?: boolean;
  realTitle?: string;
  sureText?: string;
  cancelText?: string;
  showSure?: boolean;
  showCancel?: boolean;
  isAdd?: boolean;
  isEdit?: boolean;
  isMore?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  sureText: '确定',
  cancelText: '取消',
  showSure: true,
  showCancel: true
});
interface Emits {
  (e: 'sure'): void;
  (e: 'clear'): void;
  (e: 'update:modelValue', v: boolean): void;
};
const emit = defineEmits<Emits>();

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
</script>
