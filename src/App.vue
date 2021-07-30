<!--
 * @Author: zhangyang
 * @Date: 2020-12-02 18:02:24
 * @LastEditTime: 2021-07-30 16:24:35
 * @Description: 主页面
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider} from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
</script>
