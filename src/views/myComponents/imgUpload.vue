<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:20:24
 * @LastEditTime: 2021-08-31 15:10:53
 * @Description:
-->
<template>
  <!-- <div v-for="(item, index) in danmus" :key="index">
    <h1 v-pin="item">来了老弟</h1>
  </div> -->
  <young-img-upload v-model="imgs" @did="success" />
</template>
<script lang="ts" setup>
const imgs = ref([]);
const success = console.log;
// const danmus = ref<Pin_Text_Config[]>([]);
// for (let i = 0; i < 10; i++) {
//   danmus.value.push({
//     top: 100 + Math.floor(Math.random() * 600),
//     start: 1700 + Math.floor(Math.random() * 3000),
//     color: 'gray'
//   });
// }
</script>
