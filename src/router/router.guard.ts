/**
 * 路由相关守卫，主要控制管理页面路由权限
 */
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from '@/store/index';
import { ElMessage } from 'element-plus';

/**
 * 身份验证守卫
 */
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 判断标题
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  } else {
    document.title = appStore.getters['app/title']
      ? `${appStore.getters['app/title']} | 云分享`
      : '云分享';
  }

  // 进行判断，路由是否需要身份验证
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // 判断当前用户是否登录
    if (!appStore.getters['login/isLoggedIn']) {
      ElMessage.error('抱歉，您没有权限访问！');

      // 跳转到登录页面
      next({ name: 'home' });
    }

    // 下一步
    next();
  }

  // 下一步
  next();
};
