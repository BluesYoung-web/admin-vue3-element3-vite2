<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:23:19
 * @LastEditTime: 2021-07-05 16:43:23
 * @Description: 富文本编辑器
-->
<template>
  <div class="w-1580px">
    <young-editor @sure="submitHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YoungEditor from '/components/YoungEditor/index.vue';
export default defineComponent({
  name: 'RichTextEditor',
  components: { YoungEditor },
  setup() {
    const submitHandler = (res: string) => console.log(res);
    return {
      submitHandler
    };
  }
});
</script>
