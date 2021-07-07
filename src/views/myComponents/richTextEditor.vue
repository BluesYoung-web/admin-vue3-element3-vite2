<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:23:19
 * @LastEditTime: 2021-07-07 10:53:31
 * @Description: 富文本编辑器
-->
<template>
  <div class="w-1580px">
    <young-editor @sure="submitHandler" />
  </div>
</template>
<script lang="ts" setup>
import YoungEditor from '/components/YoungEditor/index.vue';
const submitHandler = (res: string) => console.log(res);
</script>
