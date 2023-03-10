import { RouteRecordRaw } from 'vue-router';
import AppManagement from '@/views/manage/index.vue';
import AppManagementBlogList from '@/views/manage/blog/list/index.vue';
import AppManagementBlogPublish from '@/views/manage/blog/publish/index.vue';
import AppManagementBlogCategory from '@/views/manage/blog/category/index.vue';
import AppManagementBlogTags from '@/views/manage/blog/tags/index.vue';
import AppManagementImageCommon from '@/views/manage/image/common/index.vue';
import AppManagementImageAvatar from '@/views/manage/image/avatar/index.vue';
import AppManagementComment from '@/views/manage/comment/index.vue';
import AppManagementOperationAnnounce from '@/views/manage/operation/announce/index.vue';
import AppManagementOperationUpdateLog from '@/views/manage/operation/updateLog/index.vue';
import AppManagementOperationRewardList from '@/views/manage/operation/rewardList/index.vue';
import AppManagementAccount from '@/views/manage/account/index.vue';

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
    meta: {
      requireAuth: true,
      title: '博客管理 | 云分享后台',
    },
    children: [
      {
        name: 'manage.blog.list',
        path: '/manage/blog/list',
        component: AppManagementBlogList,
        meta: {
          title: '博客列表 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.blog.publish',
        path: '/manage/blog/publish',
        component: AppManagementBlogPublish,
        meta: {
          title: '发布博客 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.blog.edit',
        path: '/manage/blog/edit/:postId',
        component: AppManagementBlogPublish,
        meta: {
          title: '编辑博客 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.blog.category',
        path: '/manage/blog/category',
        component: AppManagementBlogCategory,
        meta: {
          title: '分类管理 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.blog.tags',
        path: '/manage/blog/tags',
        component: AppManagementBlogTags,
        meta: {
          title: '标签管理 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.image.common',
        path: '/manage/image/common',
        component: AppManagementImageCommon,
        meta: {
          title: '图片池 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.image.avatar',
        path: '/manage/image/avatar',
        component: AppManagementImageAvatar,
        meta: {
          title: '头像管理 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.comment',
        path: '/manage/comment',
        component: AppManagementComment,
        meta: {
          title: '评论管理 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.account',
        path: '/manage/account',
        component: AppManagementAccount,
        meta: {
          title: '评论管理 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.operation.announce',
        path: '/manage/operation/announce',
        component: AppManagementOperationAnnounce,
        meta: {
          title: '网站公告 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.operation.updateLog',
        path: '/manage/operation/updateLog',
        component: AppManagementOperationUpdateLog,
        meta: {
          title: '更新日志 | 云分享后台',
          requireAuth: true,
        },
      },
      {
        name: 'manage.operation.rewardList',
        path: '/manage/operation/rewardList',
        component: AppManagementOperationRewardList,
        meta: {
          title: '好心人名单 | 云分享后台',
          requireAuth: true,
        },
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
