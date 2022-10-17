import { RouteRecordRaw } from 'vue-router';
import AppLogin from '@/views/login/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: AppLogin,
    meta: { tittle: '秘密登录 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
