<!--
 * @Author: zhangyang
 * @Date: 2021-03-05 11:22:05
 * @LastEditTime: 2021-08-27 09:37:54
 * @Description: 富文本编辑器组件
-->
<template>
  <div>
    <div id="youngEditor" />
    <div v-if="useDefaultBtn" class="mt-10px float-right">
      <el-button type="default" @click="resetHandler">重置</el-button>
      <el-button type="success" @click="submitHandler">提交</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Editor from 'wangeditor';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import conf from './conf/index';
import { CommonConfig } from './conf/index';

interface Props {
  modelValue?: Editor;
  configObj?: CommonConfig;
  useDefaultBtn?: boolean;
};
const props = withDefaults(defineProps<Props>(), { configObj: () => ({}), useDefaultBtn: true });
interface Emits {
  (e: 'update:modelValue', v: Editor): void;
  (e: 'sure', v: string): void;
  (e: 'clear'): void;
};
const emit = defineEmits<Emits>();

let editor: Editor;
onMounted(async () => {
  editor = new Editor('#youngEditor');
  editor.highlight = hljs;
  Object.assign(editor.config, conf);
  Object.assign(editor.config, props.configObj);
  editor.create();
  await emit('update:modelValue', editor);
});
onBeforeUnmount(() => editor.destroy());
const resetHandler = () => {
  editor.txt.clear();
  emit('clear');
};
const submitHandler = () => {
  const res = editor.txt.html() || '';
  emit('sure', res);
};
</script>
