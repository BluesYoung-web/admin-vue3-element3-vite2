<!--
 * @Author: zhangyang
 * @Date: 2020-12-02 18:02:24
 * @LastEditTime: 2021-08-31 15:08:10
 * @Description: 主页面
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn';
</script>
