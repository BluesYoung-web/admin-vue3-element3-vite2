<!--
 * @Author: zhangyang
 * @Date: 2021-03-03 13:55:37
 * @LastEditTime: 2021-07-05 15:35:51
 * @Description: 图片上传组件
-->
<template>
  <!-- 图片上传组件 -->
  <div class="w-300px">
    <input ref="imgRef" type="file" accept="image/*" name="img" :multiple="(limit > 1)" hidden>
    <div>
      <el-button
        v-if="showUpload"
        type="primary"
        icon="el-icon-picture"
        :disabled="(modelValue.length >= 10)"
        @click="choseImg"
      >
        点击选取图片（不超过{{ limit }}张）
      </el-button>
      <el-button type="success" icon="el-icon-upload" @click="uploadHandler">上传</el-button>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in modelValue"
        :key="item + '9527' + index"
        class="relative"
      >
        <el-image :src="item" :preview-src-list="modelValue" lazy class="w-50px h-50px mr-5px mt-5px" />
        <el-button v-if="!hideDel" icon="el-icon-delete" type="danger" circle class="absolute transform scale-65 right-0" @click="del(item)" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { upload } from '../../util/request';
interface Props {
  modelValue: string[];
  showUpload?: boolean;
  limit?: number;
  params?: { [p: string]: any };
  hideDel?: boolean;
};
const props = withDefaults(defineProps<Props>(), { showUpload: true, limit: 10, params: () => ({}) });
interface Emits {
  (e: 'update:modelValue', urls: string[]): void;
  (e: 'did', urls: string[]): void;
};
const emit = defineEmits<Emits>();

const addedListener = ref(false);
const imgRef = ref<any>(null);
const allFiles: File[] = [];

const fileChange = (event: InputEvent) => {
  const files = (event.target as HTMLInputElement).files ?? [];
  const curr_nums = props.modelValue.length;
  const add_nums = files.length;
  if (curr_nums + add_nums > props.limit) {
    emit('update:modelValue', props.modelValue.concat(Array.from(files).slice(0, props.limit - curr_nums).map((f) => {
      allFiles.push(f);
      return URL.createObjectURL(f);
    })));
    ElMessage.warning(`最多只能上传${props.limit}张`);
    return;
  }

  emit('update:modelValue', props.modelValue.concat(Array.from(files).map((f) => {
    allFiles.push(f);
    return URL.createObjectURL(f);
  })));
};
// 只监听一次，避免内存泄漏
const choseImg = () => {
  !addedListener.value && imgRef.value.addEventListener('change', fileChange) && (addedListener.value = true);
  imgRef.value.click();
};

const del = (url: string) => {
  const index = props.modelValue.indexOf(url);
  allFiles.splice(index, 1);
  props.modelValue.splice(index, 1);
  emit('update:modelValue', props.modelValue);
};

const uploadHandler = async () => {
  const formData = new FormData();
  allFiles.forEach((v, i) => formData.append('img' + i, v));
  const res = await upload(props.params, formData) as unknown as string[];
  emit('did', res);
};
</script>
