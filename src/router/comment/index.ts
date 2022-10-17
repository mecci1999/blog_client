import { RouteRecordRaw } from 'vue-router';
import AppComment from '@/views/comment/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'comment',
    path: '/comment',
    component: AppComment,
    meta: { title: '树洞 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
