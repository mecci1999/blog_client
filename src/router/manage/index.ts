import { RouteRecordRaw } from 'vue-router';
import AppManagement from '@/views/manage/index.vue';
import AppManagementBlogList from '@/views/manage/blog/list/index.vue';
import AppManagementBlogPublish from '@/views/manage/blog/publish/index.vue';
import AppManagementBlogCategory from '@/views/manage/blog/category/index.vue';
import AppManagementBlogTags from '@/views/manage/blog/tags/index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'manage',
    path: '/manage',
    component: AppManagement,
    redirect: {
      name: 'manage.blog.list',
    },
    children: [
      {
        name: 'manage.blog.list',
        path: '/manage/blog/list',
        component: AppManagementBlogList,
        meta: {
          title: '博客列表',
        },
      },
      {
        name: 'manage.blog.publish',
        path: '/manage/blog/publish',
        component: AppManagementBlogPublish,
        meta: {
          title: '发布博客',
        },
      },
      {
        name: 'manage.blog.category',
        path: '/manage/blog/category',
        component: AppManagementBlogCategory,
        meta: {
          title: '分类管理',
        },
      },
      {
        name: 'manage.blog.tags',
        path: '/manage/blog/tags',
        component: AppManagementBlogTags,
        meta: {
          title: '标签管理',
        },
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
