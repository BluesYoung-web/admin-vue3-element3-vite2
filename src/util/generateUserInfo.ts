/*
 * @Author: zhangyang
 * @Date: 2020-12-10 08:57:28
 * @LastEditTime: 2021-09-10 09:11:33
 * @Description: 获取用户详细信息及其拥有权限的路由
 */
import { getUserInfo } from '../api/user';
import { USER_INFO, NAV_ARR, ROLE_ROUTE } from '../store/sessionStorage/index';
// 使用前端权限控制时引入
// import { commonNavArr, adminNavArr } from '../route/navArr';
import { getUrl } from '../route/navMap';


let role_route: string[] = [];

const generateRoleRoute = (arr: NavArrItem[], num?: number): string[] => {
  if (num === 1) {
    role_route = [];
  }
  for (const item of arr) {
    item.node_path && role_route.push(item.node_path);
    // 子节点递归遍历
    if (isArray(item.part) && item.part.length > 0) {
      const part = JSON.parse(JSON.stringify(item.part));
      // 尾递归优化
      generateRoleRoute(part);
    }
  }
  return role_route;
};

const generateUserInfo = async () => {
  const infoObj = await getUserInfo();
  if (infoObj) {
    const {
      admin_name,
      real_name,
      role_id,
      role_name,
      is_enable,
      autoid,
      phone_number,
      menuBar
    } = infoObj as any;
    const userInfo: UserInfo = {
      admin_name,
      autoid,
      real_name,
      role_id,
      role_name: isArray(role_name) ? role_name : [role_name],
      is_enable,
      tel: phone_number || ''
    };
    // 根据用户角色，返回特定的导航栏数组
    // const navArr: NavArrItem[] = commonNavArr || adminNavArr || ...;

    // 后端获取用户可见节点
    const navArr: NavArrItem[] = menuBar;
    const routes: string[] = generateRoleRoute(navArr, 1);
    // 生成角色有权访问的路由
    const roleRoute: string[] = routes.map((route) => getUrl(route));

    USER_INFO.value = deepClone(userInfo);
    NAV_ARR.value = deepClone(navArr);
    ROLE_ROUTE.value = deepClone(roleRoute);
  } else {
    return;
  }
};

export {
  generateUserInfo
};
