<!--
 * @Author: zhangyang
 * @Date: 2021-09-28 11:20:43
 * @LastEditTime: 2021-09-28 11:36:32
 * @Description: 剪切板测试
-->
<script lang="ts" setup>
import { copy2Clipboard } from "../../util/tool";

const str = ref('');
const copy = () => copy2Clipboard(str.value);
</script>
<template>
  <el-card class="w-80 h-60 flex items-center justify-center text-center">
    <el-input
      v-model.trim="str"
      class="block mb-3"
      type="textarea"
      placeholder="请输入你想复制到剪切板的内容"
      :rows="5"
    />
    <br />
    <el-button size="medium" type="primary" @click="copy">点击复制到剪切板</el-button>
  </el-card>
</template>
