import { RouteRecordRaw } from 'vue-router';
import AppAbout from '@/views/about/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'about',
    path: '/about',
    component: AppAbout,
    meta: { title: '关于博客 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
