import { RouteRecordRaw } from 'vue-router';
import AppCopyright from '@/views/copyright/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'copyright',
    path: '/copyright',
    component: AppCopyright,
    meta: { title: '版权协议 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
