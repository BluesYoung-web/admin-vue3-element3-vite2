<!--
 * @Author: zhangyang
 * @Date: 2021-08-23 09:38:17
 * @LastEditTime: 2021-09-07 16:56:02
 * @Description: 滑块验证
-->
<template>
  <teleport :to="props.target">
    <div v-show="props.modelValue" v-bind="$attrs" class="_young_slide_verify_cover">
      <div id="captcha">
        <div class="slide">
          <span class="btn"></span>
        </div>
      </div>
      <svg @click="close" t="1629700453040" class="icon close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1149" width="32" height="32">
        <path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-975.36C257.024 48.64 48.64 257.024 48.64 512c0 254.976 207.872 463.36 463.36 463.36S975.36 767.488 975.36 512 766.976 48.64 512 48.64z" fill="#8A8A8A" p-id="1150"></path>
        <path d="M548.864 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L512 475.136 316.928 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L475.136 512 280.064 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L512 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L548.864 512z" fill="#8A8A8A" p-id="1151"></path>
      </svg>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: boolean;
  zIndex?: number;
  target?: string;
}>(), {
  show: false,
  zIndex: 3000,
  target: 'body'
});
interface Emits {
  (e: 'update:modelValue', v: boolean): void;
  (e: 'success'): void;
  (e: 'fail'): void;
}
const emit = defineEmits<Emits>();
const canMove = ref(false);

onMounted(() => {
  const cover = document.querySelector('._young_slide_verify_cover') as HTMLElement;

  const cap = document.querySelector('#captcha');
  const handle = document.querySelector('.slide');
  const btn = document.querySelector('.btn');

  watchEffect(() => {
    cover.style.setProperty('--z_index', props.zIndex + '');
    if (props.modelValue) {
      cap?.classList.remove('pass');
    }
  });

  const moveHandler = (e: MouseEvent) => {
    if (canMove.value) {
      const _offset = handle?.getBoundingClientRect().left ?? 0;
      const _btn_width = btn?.getBoundingClientRect().width ?? 0;
      cover.style.setProperty('--offset', `${e.clientX - _offset - _btn_width / 2}px`);
    }
  };

  const checkHandler = (e: MouseEvent) => {
    cover.style.setProperty('--offset', `0px`);
    if (canMove.value) {
      const final_offset = e.clientX - (handle?.getBoundingClientRect().left ?? 0);
      if (final_offset >= 275 && final_offset <= 285) {
        cap?.classList.add('pass');
        emit('success');
      } else {
        emit('fail');
      }
    }
    canMove.value = false;
  };

  btn?.addEventListener('mousedown', () => canMove.value = true);

  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', checkHandler);

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', checkHandler);
  });
});

const close = () => emit('update:modelValue', false);
</script>

<style lang="scss" scoped>
._young_slide_verify_cover {
  --width: 400px;
  --height: 260px;
  --btn_width: 80px;
  --z_index: 3000;
  --offset: 0px;

  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: var(--z_index);
  display: flex;
  justify-content: center;
  align-items: center;

  .close-icon {
    position: absolute;
    top: calc(50vh - var(--height) / 2 - 36px);
    right: calc(50vw - var(--width) / 2 - 36px);
    cursor: pointer;
  }
}
#captcha {
  width: var(--width);
  height: var(--height);
  border-radius: 4px;
  background-image: url(https://source.unsplash.com/random/1920x1080);
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);

  &::after, &::before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;

    clip-path: inset(100px 100px 100px 240px round 6px);
  }

  &::after {
    transform: translateX(
      clamp(
        calc(var(--width) * -1 + var(--btn_width) * 2),
        calc(var(--width) * -1 + var(--btn_width) * 2 + var(--offset)),
        var(--btn_width)
      )
    );
    transition: 0.25s all ease-in-out;
  }
  &:active::after, &:active .slide .btn {
    transition: none;
  }

  &::before {
    background-color: rgba(0, 0, 0, 0.6);
    background-blend-mode: multiply;
  }

  .slide {
    width: var(--width);
    height: 30px;
    border-radius: 18px;
    background-color: #eee;
    position: absolute;
    bottom: -50px;
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;

    .btn {
      display: block;
      width: var(--btn_width);
      height: inherit;
      border-radius: inherit;
      background-color: white;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3);
      position: absolute;
      z-index: calc(var(--z_index) + 2);
      cursor: move;
      transform: translateX(
        clamp(
          0px,
          var(--offset),
          calc(var(--width) - var(--btn_width))
        )
      );

      transition: 0.25s all ease-in-out;
    }

    &::after {
      content: '向右滑动完成验证';
      text-align: center;
      width: var(--width);
      height: 30px;
      line-height: 30px;
      position: absolute;
      color: #999;
      z-index: calc(var(--z_index) + 1);;
    }
  }
}
#captcha.pass::before, #captcha.pass::after, #captcha.pass > .slide {
  opacity: 0;
}
</style>
