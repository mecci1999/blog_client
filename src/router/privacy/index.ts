import { RouteRecordRaw } from 'vue-router';
import AppPrivacy from '@/views/privacy/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'privacy',
    path: '/privacy',
    component: AppPrivacy,
    meta: { title: '隐私政策 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
