<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:04:10
 * @LastEditTime: 2021-09-02 11:23:55
 * @Description: 侧边栏开关按钮组件
-->
<template>
  <div class="w-10 p-2 font-bold transform transition-transform duration-1000 ease-in-out" @click="$emit('toggleClick')">
    <i-fxemoji-monkeysee v-if="isActive" />
    <i-fxemoji-monkeyface v-else />
  </div>
</template>
<script lang="ts" setup>
interface Props { isActive: boolean };
const props = withDefaults(defineProps<Props>(), { isActive: false });
const emit = defineEmits(['toggleClick']);
</script>
