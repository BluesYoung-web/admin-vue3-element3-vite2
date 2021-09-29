<!--
 * @Author: zhangyang
 * @Date: 2021-09-29 11:29:11
 * @LastEditTime: 2021-09-29 16:38:41
 * @Description: 自定义表单测试
-->
<script lang="ts" setup>
interface Form {
  name: string;
  date: Date | '';
  age: number;
  sw: number;
  s1: string;
  s2: string;
  ck: string[];
  dx: string;
  xl: number | '';
}
const form = ref<Form>({
  name: '',
  date: '',
  age: 1,
  sw: 1,
  s1: '',
  s2: '',
  ck: [],
  dx: '',
  xl: ''
});
const schema: Form_Schema_item<Form>[] = [
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    rules: [
      { required: true, message: '姓名必填', trigger: 'blur' }
    ],
    attrs: {
      placeholder: '请输入姓名',
      style: 'width: 220px',

    }
  },
  {
    type: 'date-picker',
    prop: 'date',
    label: '时间',
    attrs: { type: 'datetime', placeholder: '请选择时间' }
  },
  {
    type: 'input-number',
    prop: 'age',
    label: '年龄'
  },
  {
    type: 'switch',
    prop: 'sw',
    label: '选择',
    attrs: {
      activeValue: 1,
      inactiveValue: 0
    }
  },
  { type: 'slot', prop: 's1', label: '插槽1' },
  { type: 'slot', prop: 's2', label: '插槽2' },
  {
    type: 'check-box',
    prop: 'ck',
    label: '多选',
    attrs: {
      options: [{ label: '111' }, { label: '222' }, { label: '333' }]
    }
  },
  {
    type: 'radio',
    prop: 'dx',
    label: '单选',
    attrs: {
      options: [
        { label: 'A', content: '111' },
        { label: 'B', content: '222' },
        { label: 'C', content: '333' },
      ]
    }
  },
  {
    type: 'select',
    prop: 'xl',
    label: '下拉选择',
    attrs: {
      filterable: true,
      options: [
        { label: 1, content: '111' },
        { label: 2, content: '222' },
        { label: 3, content: '333' },
      ]
    }
  }
];

watchEffect(() => console.log(form.value));
</script>
<template>
  <el-card class="w-120 h-120 m-auto">
    <young-form v-model="form" :schema="schema" label-width="80px">
      <template #s1="{value}">
        {{ value }}
      </template>
      <template #s2="{value}">
        {{ value }}
      </template>
    </young-form>
  </el-card>
</template>
