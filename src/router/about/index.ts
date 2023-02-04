import { RouteRecordRaw } from 'vue-router';
import AppAbout from '@/views/about/index.vue';
import AppGift from '@/views/gift/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'about',
    path: '/about',
    component: AppAbout,
    meta: { title: '关于本站 | 云分享' },
  },
  {
    name: 'gift',
    path: '/gift',
    component: AppGift,
    meta: { title: '礼物 | 云分享' },
  },
];

/**
 * 默认导出
 */
export default routes;
