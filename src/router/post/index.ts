import { RouteRecordRaw } from 'vue-router';
import PostShow from '../../components/post/show/index.vue';


/**
 * 定义路由
 */
const routes:Array<RouteRecordRaw> = [
    {
        name: 'postShow',
        path: '/post/:postId',
        component: PostShow,
        props: true,
    }
]

/**
 * 默认导出
 */
export default routes;