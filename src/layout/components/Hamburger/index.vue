<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:04:10
 * @LastEditTime: 2021-09-17 15:17:39
 * @Description: 侧边栏开关按钮组件
-->
<template>
  <div class="w-10 p-2 font-bold transform transition-transform duration-1000 ease-in-out" @click="$emit('update:modelValue', !modelValue)">
    <icon-fxemoji-monkeyface v-if="modelValue" />
    <icon-fxemoji-monkeysee v-else />
  </div>
</template>
<script lang="ts" setup>
interface Props { modelValue: boolean };
const props = withDefaults(defineProps<Props>(), { modelValue: false });
const emit = defineEmits(['update:modelValue']);
</script>
