<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:54:02
 * @LastEditTime: 2021-07-05 14:20:58
 * @Description: SVG 图标组件
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { isHttpUrl } from '../../util/valid';
import { computed } from 'vue';

interface Props {
  name: string;
  prefix?: string;
  className?: string;
};
const props = withDefaults(defineProps<Props>(), { prefix: 'icon', className: '' });
const isExternal = computed(() => isHttpUrl(props.name));
const iconName = computed(() => `#${props.prefix}-${props.name}`);
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.name}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`
  };
});
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
