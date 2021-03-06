<!--
 * @Author: zhangyang
 * @Date: 2021-03-05 11:22:05
 * @LastEditTime: 2021-03-05 17:17:42
 * @Description: 富文本编辑器组件
-->
<template>
  <div>
    <div id="youngEditor" />
    <div v-if="useDefaultBtn" class="btn-group">
      <el-button type="default" @click="resetHandler">重置</el-button>
      <el-button type="success" @click="submitHandler">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from 'vue';
import Editor from 'wangeditor';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import conf, { CommonConfig } from './conf/index';
export default defineComponent({
  name: 'YoungEditor',
  props: {
    configObj: {
      type: Object as PropType<CommonConfig>,
      default: () => ({})
    },
    useDefaultBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'reset', 'submit'],
  setup(props, { emit }) {
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
      emit('reset', '');
    };
    const submitHandler = () => {
      const res = editor.txt.html();
      emit('submit', res);
    };
    return {
      resetHandler,
      submitHandler
    };
  }
});
</script>

<style lang="scss" scoped>
.btn-group {
  margin-top: 10px;
  float: right;
}
</style>