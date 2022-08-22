/**
 * 服务接口基本地址
 */
export const API_BASE_URL = () => {
  if (process.env.NODE_DEV === 'development') {
    return import.meta.env.VITE_API_BASE_URL;
  } else {
    return import.meta.env.VITE_API_BASE_URL;
  }
};

/**
 * 客户端域名
 */
export const VITE_APP_CLIENT_BASE_URL = 'http://localhost:8000';

/**
 * 内容分页
 */
export const VITE_POSTS_PER_PAGE = parseInt(
  `${import.meta.env.VITE_POSTS_PER_PAGE}`,
  10,
);

/**
 * 评论分页
 */
export const VITE_COMMENTS_PER_PAGE = parseInt(
  `${import.meta.env.VITE_COMMENTS_PER_PAGE}`,
  10,
);
