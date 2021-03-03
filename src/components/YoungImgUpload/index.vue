<template>
  <!-- 图片上传组件 -->
  <div class="upload">
    <input ref="imgRef" type="file" name="img" :multiple="(limit > 1)" hidden>
    <div>
      <el-button
        v-if="showUpload"
        type="primary"
        icon="el-icon-picture"
        :disabled="(imgs.length >= 10)"
        @click="choseImg"
      >
        点击选取图片（不超过{{ limit }}张）
      </el-button>
      <el-button type="success" icon="el-icon-upload" @click="uploadHandler">上传</el-button>
    </div>
    <el-image
      v-for="(item, index) in imgs"
      :key="item + '9527' + index"
      :src="item"
      :preview-src-list="imgs"
      lazy
      class="img"
      @contextmenu.prevent="openMenu($event, item)"
    />
    <ul
      v-show="visible"
      :style="{left: left + 'px', top: top + 'px'}"
      class="contextmenu"
    >
      <li @click="del">删除</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { RefElement } from 'element-plus/lib/el-popper/src/use-popper';
import { defineComponent, Ref, ref, watch, PropType } from 'vue';
import { upload } from '../../util/request';

export default defineComponent({
  name: 'YoungImgUpload',
  props: {
    limit: { type: Number, default: 10 },
    comTask: { type: Object, default: '' },
    imgs: { type: Object as PropType<string[]>, required: true },
    showUpload: { type: Boolean, default: true }
  },
  emits: ['update:imgs', 'did'],
  setup(props, { emit }) {
    let addedListener = ref(false), visible = ref(false);
    let top = ref(0), left = ref(0);
    let toBeDel = '';
    const imgRef: Ref<RefElement> = ref(null);
    const allFiles: File[] = [];


    const closeMenu = () => visible.value = false;
    watch(() => visible.value, (val) => {
      if (val) {
        document.body.addEventListener('click', closeMenu);
      } else {
        document.body.removeEventListener('click', closeMenu);
      }
    });
    const fileChange = (event: InputEvent) => {
      const files = (event.target as HTMLInputElement).files ?? [];
      if ((props.imgs.length + files.length) > props.limit) {
        ElMessage.warning(`最多只能上传${props.limit}张`);
        return;
      }
      
      emit('update:imgs', props.imgs.concat(Array.from(files).map((f) => {
        allFiles.push(f);
        return URL.createObjectURL(f);
      })));
    };
    // 只监听一次，避免内存泄漏
    const choseImg = () => {
      !addedListener.value && imgRef.value.addEventListener('change', fileChange) && (addedListener.value = true);
      imgRef.value.click();
    };

    const openMenu = (e: MouseEvent, url: string) => {
      toBeDel = url;
      const menuWidth = 105;
      const offsetLeft = 120;
      left.value = e.clientX - menuWidth - offsetLeft;
      top.value = e.clientY; 
      visible.value = true;
    };

    const del = () => {
      const index = props.imgs.indexOf(toBeDel);
      allFiles.splice(index, 1);
      props.imgs.splice(index, 1);
      emit('update:imgs', props.imgs);
      visible.value = false;
    };

    const uploadHandler = async () => {
      const formData = new FormData();
      allFiles.forEach((v, i) => formData.append('img' + i, v));
      const res = await upload(props.comTask, formData);
      emit('did', res);
    };
    return {
      addedListener,
      visible,
      top,
      left,
      toBeDel,
      imgRef,
      choseImg,
      openMenu,
      del,
      uploadHandler
    };
  }
});
</script>

<style lang="scss" scoped>
.upload {
  width: 300px
}
.img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  margin-top: 5px;
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 0;
    color:red;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
