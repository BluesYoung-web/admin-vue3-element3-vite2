<!--
 * @Author: zhangyang
 * @Date: 2021-02-25 15:23:19
 * @LastEditTime: 2021-03-10 16:09:08
 * @Description: 富文本编辑器
-->
<template>
  <div class="rich">
    <young-editor @submit="submitHandler" />
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

<style lang="scss" scoped>
.rich {
  width: 1580px;
}
</style>