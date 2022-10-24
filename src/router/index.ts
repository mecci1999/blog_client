import { createRouter, createWebHashHistory } from 'vue-router';
import appRoutes from './app/index';
import postRoutes from './post/index';
import aboutRoutes from './about/index';
import commentRoutes from './comment/index';
import tagsRoutes from './tags/index';
import categoryRoutes from './category/index';
import articleRoutes from './post/list/index';
import loginRoutes from './login/index';
import manageRoutes from './manage/index';
import privacyRoutes from './privacy/index';
import copyrightRoutes from './copyright/index';
import { authGuard } from './router.guard';

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...appRoutes,
    ...postRoutes,
    ...aboutRoutes,
    ...commentRoutes,
    ...tagsRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...loginRoutes,
    ...manageRoutes,
    ...privacyRoutes,
    ...copyrightRoutes,
  ],
});

/**
 * 路由守卫
 */
router.beforeEach(authGuard);

/**
 * 默认导出
 */
export default router;
