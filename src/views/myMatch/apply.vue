<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:20:24
 * @LastEditTime: 2021-03-05 09:35:29
 * @Description: 
-->
<template>
  <div v-for="(item, index) in danmus" :key="index">
    <h1 v-pin="item">来了老弟{{index}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TextConfig } from '../../plugins/directives/pin';
export default defineComponent({
  name: 'Apply',
  setup() {
    let danmus = ref<TextConfig[]>([]);
    for (let i = 0; i < 100; i++) {
      danmus.value.push({
        top: 100 + Math.floor(Math.random() * 600),
        start: 1700 + Math.floor(Math.random() * 3000),
        color: 'gray'
      })
    }
    
    return {
      danmus
    };
  }
});
</script>