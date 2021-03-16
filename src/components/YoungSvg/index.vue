<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:54:02
 * @LastEditTime: 2021-03-16 15:14:05
 * @Description: SVG 图标组件
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isHttpUrl } from '../../util/valid';
export default defineComponent({
  name: 'YoungSvg',
  props: {
    name: { type: String, required: true },
    prefix: { type: String, default: 'icon' },
    className: { type: String, default: '' }
  },
  setup(props) {
    const isExternal = computed(() => isHttpUrl(props.name));
    const iconName = computed(() => `#${props.prefix}-${props.name}`);
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className;
      } else {
        return 'svg-icon';
      }
    });
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`
      }
    });

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
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
