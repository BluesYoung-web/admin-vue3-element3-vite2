<!--
 * @Author: zhangyang
 * @Date: 2021-09-29 14:18:32
 * @LastEditTime: 2021-09-29 16:39:13
 * @Description: 自定义表单组件
-->
<script lang="ts" setup>
interface Props {
  modelValue: CommonRecord;
  schema: Form_Schema_item<any>[];
};
const props = defineProps<Props>();
interface Emits {
  (e: 'update:modelValue', v: CommonRecord): void;
};
const emit = defineEmits<Emits>();

const formRef = ref<any>();
const form = ref<CommonRecord>(deepClone(props.modelValue));
watchEffect(() => {
  const v = deepClone(props.modelValue);
  nextTick(() => {
    form.value = deepClone(v);
  });
});
const change = () => {
  emit('update:modelValue', deepClone(form.value));
};
</script>
<template>
  <el-form ref="formRef" :model="form">
    <el-form-item
      v-for="(item, index) in props.schema"
      :key="index"
      :label="item.label"
      :prop="String(item.prop)"
      :rules="item.rules ?? []"
    >
      <el-checkbox-group
        v-if="item.type === 'check-box'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      >
        <el-checkbox
          v-for="(it, idx) in item.attrs?.options??[]"
          :label="it.label"
          :key="idx + 'das'"
        />
      </el-checkbox-group>
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      >
        <el-radio
          v-for="(it, idx) in item.attrs?.options??[]"
          :label="it.label"
          :key="idx + 'dadass'"
        >{{ it.content }}</el-radio>
      </el-radio-group>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      >
        <el-option
          v-for="(it, idx) in item.attrs?.options"
          :value="it.label"
          :label="it.content"
          :key="idx + 'retrgdr'"
        />
      </el-select>
      <el-date-picker
        v-if="item.type === 'date-picker'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      />
      <el-input
        v-if="item.type === 'input'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @input="change"
      />
      <el-input-number
        v-if="item.type === 'input-number'"
        v-model.number="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      />
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[String(item.prop)]"
        v-bind="item.attrs"
        @change="change"
      />
      <slot v-if="item.type === 'slot'" :name="item.prop" :value="item" />
    </el-form-item>
  </el-form>
</template>
