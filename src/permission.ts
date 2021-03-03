/*
 * @Author: zhangyang
 * @Date: 2020-12-09 17:21:19
 * @LastEditTime: 2021-03-02 08:38:14
 * @Description: 页面权限控制
 */
import router from './route/index';
import NProgress from 'nprogress';

import { ElMessageBox, ElMessage } from 'element-plus';
import { getToken } from './util/auth';
import { getRoleRoute } from './store/sessionStorage/index';

NProgress.configure({
  showSpinner: false
});

const hasPermission = (route: string) => {
  const roleRoute = getRoleRoute().concat('/login', '/404');
  return roleRoute.includes(route);
}

/**
 * 前置导航守卫
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = (to.meta.title as string) || '小黑后台';

  // 此处添加鉴权
  if (!getToken().token && to.path !== '/login') {
    await ElMessageBox.confirm('请先去登录', '提示', {
      type: 'error',
      showCancelButton: false,
      closeOnClickModal: false,
    }).catch(() => null);
    next({
      path: `/login`,
      query: {
        redirect: to.path
      }
    });

    NProgress.done();
  } else if (!hasPermission(to.path)) {
    // 具体页面权限 map 判断
    ElMessage.error('暂时无权访问该页面，请勿进行恶意操作');
    next(from.path);
  } else {
    next();
  }
});

/**
 * 后置导航守卫
 */
router.afterEach(() => {
  NProgress.done();
});