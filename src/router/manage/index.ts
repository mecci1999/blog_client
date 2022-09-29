import { RouteRecordRaw } from 'vue-router';
import AppManagement from '@/views/manage/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'manage',
    path: '/manage',
    component: AppManagement,
  },
];

/**
 * 默认导出
 */
export default routes;
