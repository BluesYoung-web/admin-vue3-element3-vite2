<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:23:19
 * @LastEditTime: 2021-08-31 15:10:48
 * @Description: 富文本编辑器
-->
<template>
  <div class="w-1580px">
    <young-editor @sure="submitHandler" />
  </div>
</template>
<script lang="ts" setup>
const submitHandler = (res: string) => console.log(res);
</script>
