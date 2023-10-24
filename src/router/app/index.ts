import { RouteRecordRaw } from 'vue-router';
import AppHome from '@/views/home/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: AppHome,
    meta: { title: '顺丰FE' },
  },
];

/**
 * 默认导出
 */
export default routes;
