<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:23:19
 * @LastEditTime: 2021-03-05 17:25:33
 * @Description: 赛事列表
-->
<template>
  <young-editor @submit="submitHandler" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YoungEditor from '/components/YoungEditor/index.vue';
export default defineComponent({
  name: 'List',
  components: { YoungEditor },
  setup() {
    const submitHandler = (res: string) => console.log(res);
    return {
      submitHandler
    };
  }
});
</script>