<!--
 * @Author: zhangyang
 * @Date: 2021-08-23 09:44:43
 * @LastEditTime: 2021-08-31 15:10:24
 * @Description: 滑块验证
-->
<template>
  <el-button @click="showVerify=true" type="primary">开始验证</el-button>
  <young-slide-verify v-model="showVerify" @success="success" @fail="fail" />
</template>
<script lang="ts" setup>
const showVerify = ref(false);
const success = () => {
  showVerify.value = false;
  ElMessage.success('验证成功！');
};
const fail = () => {
  ElMessage.error('验证失败！');
};
</script>
