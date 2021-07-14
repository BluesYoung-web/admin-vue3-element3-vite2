<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:41:26
 * @LastEditTime: 2021-07-14 12:16:26
 * @Description: 点击跳转组件(内部 / 外链)
-->
<template>
  <a v-if="linkProps(to) === 'a'" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>
<script lang="ts" setup>
import { isHttpUrl } from '../../../util/valid';
const props = defineProps<{ to: string }>();
const linkProps = (url: string) => isHttpUrl(url) ? 'a' : 'router-link';
</script>
