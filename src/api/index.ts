/**
 * 项目所有的接口api方法
 */
import {
  CommentDataType,
  PostDataType,
  SearchResultType,
} from '@/types/interface';
import axios from 'axios';
import { apiHttpClient, tenApiHttpRequest } from '../utils/apiHttpClient';

/**
 * 获取博主信息接口
 * @returns
 */
export const getUserInfo = async () => {
  return await apiHttpClient.get('user');
};

/**
 * 获取用户的QQ头像以及昵称，使用的他人的api接口，注意是否会挂掉的问题,该接口已经挂掉
 */
export const getQQUserInfo = async (id: string) => {
  try {
    const response = await tenApiHttpRequest.get(`qqname/?qq=${id}`);
    // 失败
    if (response) {
      return response;
    } else {
      // 失败直接输出头像地址
      return {
        data: {
          imgurl: `https://thirdqq.qlogo.cn/g?b=sdk&nk=${id}&s=140`,
        },
      };
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _error = error as any;

    throw _error.response;
  }
};

/**
 * 获取博客分类列表
 */
export const getTypesApi = async () => {
  return await apiHttpClient.get('types/list');
};

/**
 * 获取博客标签列表
 */
export const getTagsApi = async () => {
  return await apiHttpClient.get('tags/list');
};

/**
 * 获取博客列表接口
 */
export const getPostsApi = async (page: number, query?: string) => {
  return await apiHttpClient.get(`posts?page=${page}${query}`);
};

/**
 * 获取单篇博客的信息
 */
export const getPostByIdApi = async (postId: number) => {
  return await apiHttpClient.get(`posts/${postId}`);
};

/**
 * 获取网站信息接口
 */
export const getAppInfoApi = async () => {
  return await apiHttpClient.get('dashboard/info');
};

/**
 * 获取评论列表接口
 */
export const getCommentsApi = async (postId: number, page: number) => {
  return await apiHttpClient.get(`comments?post=${postId}&page=${page}`);
};

/**
 * 回复评论列表
 */
export const getReplyCommentsApi = async (commentId: number) => {
  return await apiHttpClient.get(`comments/${commentId}/replies`);
};

/**
 * 创建评论接口
 */
export const createCommentApi = async (comment: CommentDataType) => {
  return await apiHttpClient.post(`comments`, comment);
};

/**
 * 创建回复评论接口
 */
export const createReplyCommentApi = async (
  commentId: number,
  replyComment: CommentDataType,
) => {
  return await apiHttpClient.post(`comments/${commentId}/reply`, replyComment);
};

/**
 * 更改评论审核状态接口
 */
export const updateCommentAuditStatusApi = async (
  commentId: number,
  status: string,
) => {
  return await apiHttpClient.patch(`comments/${commentId}`, status);
};

/**
 * 搜索关键词接口
 */
export const searchApi = async (keyword: string): Promise<any> => {
  return await apiHttpClient.get(`search?name=${keyword}`);
};

/**
 * 登录接口
 */
export const loginApi = async (data: any) =>
  await apiHttpClient.post('login', data);

/**
 * 修改博客状态接口
 */
export const updatePostApi = async (postId: number, data: any) =>
  await apiHttpClient.post(`posts/update/${postId}`, data);
/**
 * 删除博客状态接口
 */
export const deletePostApi = async (postId: number) =>
  await apiHttpClient.delete(`post/${postId}`);

/**
 * 创建博客
 */
export const createPostApi = async (post: PostDataType) =>
  await apiHttpClient.post('/posts/create', post);

/**
 * 给博客添加分类
 */
export const addPostType = async (postId: number, data: any) =>
  await apiHttpClient.post(`/posts/${postId}/type`, data);

/**
 * 给博客添加分类
 */
export const addPostTags = async (postId: number, data: any) =>
  await apiHttpClient.post(`/posts/${postId}/tag`, data);

/**
 * 更新分类
 */
export const updateCategoryApi = async (data: any) =>
  await apiHttpClient.post(`/types/update`, data);

/**
 * 创建分类
 */
export const createCategoryApi = async (data: any) =>
  await apiHttpClient.post(`/types`, data);

/**
 * 删除分类
 */
export const deleteCategoryApi = async (typeId: number) =>
  await apiHttpClient.get(`/types/${typeId}/delete`);

/**
 * 更新标签
 */
export const updateTagsApi = async (data: any) =>
  await apiHttpClient.post(`/tags/update`, data);

/**
 * 创建标签
 */
export const createTagsApi = async (data: any) =>
  await apiHttpClient.post(`/tags`, data);

/**
 * 删除标签
 */
export const deleteTagsApi = async (tagId: number) =>
  await apiHttpClient.get(`/tags/${tagId}/delete`);

/**
 * 获取图片列表方法
 */
export const getImageCommonList = async () =>
  await apiHttpClient.get(`/images`);

/**
 * 获取评论列表
 */
export const getComments = async (action: string, page: number) =>
  await apiHttpClient.get(`/comments?action=${action}&page=${page}`);

/**
 * 修改评论状态
 */
export const updateCommentStatus = async (commentId: number, data: any) =>
  await apiHttpClient.patch(`/comments/${commentId}`, data);
