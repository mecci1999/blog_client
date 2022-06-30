import { RouteRecordRaw } from 'vue-router';
import AppHome from '@/view/home/index.vue';

/**
 * 定义路由
 */
const routes:Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: AppHome
    }
]

/**
 * 默认导出
 */
export default routes;