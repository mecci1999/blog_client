import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app/index';
import postRoutes from './post/index';

/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...appRoutes,
        ...postRoutes,
    ],
});

/**
 * 默认导出
 */
export default router;