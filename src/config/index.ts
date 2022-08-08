/**
 * 服务接口基本地址
 */
export const API_BASE_URL = process.env.API_BASE_URL;

/**
 * 客户端域名
 */
export const APP_CLIENT_BASE_URL = 'http://localhost:8000';

/**
 * 内容分页
 */
export const POSTS_PER_PAGE = parseInt(
  `${process.env.VUE_APP_POSTS_PER_PAGE}`,
  10,
);
