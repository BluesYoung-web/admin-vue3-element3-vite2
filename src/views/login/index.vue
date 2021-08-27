<!--
 * @Author: zhangyang
 * @Date: 2020-12-03 14:25:49
 * @LastEditTime: 2021-08-27 10:03:23
 * @Description: 登录
-->
<template>
  <!-- 登录 -->
  <div class="flex items-center justify-center opacity-98 h-full">
    <el-card class="w-600px">
    <div class="bg-color-white overflow-hidden">
      <el-form
        ref="loginRef"
        :model="loginForm"
        :rules="loginRules"
        class="relative w-520px max-w-full py-50px px-35px my-0 mx-auto overflow-hidden"
        auto-complete="on"
        @keyup.enter="loginHandler"
      >
      <div class="relative">
        <h3 class="text-3xl text-center mb-60px font-bold">管理员登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账户" tabindex="1" auto-complete="on" size="large" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" tabindex="2" auto-complete="on" size="large" clearable  />
      </el-form-item>
      <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-bottom: 30px" @click="loginHandler">登 录</el-button>
    </el-form>
    </div>
  </el-card>
  </div>
</template>
<script lang="ts" setup>
import { login } from '../../api/user';
import { setToken } from '../../util/auth';
import { generateUserInfo } from '../../util/generateUserInfo';

interface LoginForm {
  username: string;
  password: string;
};

/**
 * 路由实例，记录当前路径之类的
 */
const route = useRoute();
const redirect = route.query.redirect || '/';
/**
 * 路由器实例，负责改变路由
 */
const router = useRouter();

const loginRef = ref<any>(null);
const loginForm = ref<LoginForm>({
  username: 'guest',
  password: '111111'
});
const loginRules = ref<LoginRule>({
  username: [{ required: true, type: 'string', trigger: 'blur', message: '请输入账户' }],
  password: [{ required: true, type: 'string', trigger: 'blur', message: '请输入密码' }]
});
const loading = ref(false);
const loginHandler = () => {
  loginRef.value?.validate(async (valid: boolean) => {
    try {
      if (valid) {
        loading.value = true;
        const data = await login(loginForm.value.username, loginForm.value.password);
        if (data) {
          setToken(data as unknown as UserKey);
          await generateUserInfo();
          loading.value = false;
          router.push(redirect as string);
        }
      } else {
        ElMessage.error('请仔细检查表单内容');
        return;
      }
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  });
};
</script>
