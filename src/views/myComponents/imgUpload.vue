<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:20:24
 * @LastEditTime: 2021-03-10 11:43:38
 * @Description: 
-->
<template>
  <div v-for="(item, index) in danmus" :key="index">
    <h1 v-pin="item">来了老弟{{index}}</h1>
  </div>
  <young-img-upload v-model:imgs="imgs" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import YoungImgUpload from '/components/YoungImgUpload/index.vue';
import { TextConfig } from '../../plugins/directives/pin';
export default defineComponent({
  name: 'ImgUpload',
  components: { YoungImgUpload },
  setup() {
    let imgs = ref([]);
    let danmus = ref<TextConfig[]>([]);
    for (let i = 0; i < 100; i++) {
      danmus.value.push({
        top: 100 + Math.floor(Math.random() * 600),
        start: 1700 + Math.floor(Math.random() * 3000),
        color: 'gray'
      })
    }
    
    return {
      danmus,
      imgs
    };
  }
});
</script>