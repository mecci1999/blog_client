/**
 * 此文件下都是各种数据的类型定义接口
 */
import { CommentStatus } from './enum';

export interface CommentDataType {
  id?: number; //ID
  avatarImgUrl?: string; // 头像地址
  name?: string; // 评论作者
  eMail?: string; // 邮箱地址
  content?: string; // 内容
  postId?: number; // 博客id
  parentId?: number | null; // 父级评论Id
  os?: string; // 操作系统类型
  browser?: string; // 浏览器类型
  province?: string; // 所在省份
  city?: string; // 所在城市
  status?: CommentStatus; // 评论状态
  replyCommentList?: Array<CommentDataType>; // 回复评论列表
  totalReplies?: number; // 总回复量
  created?: string; // 发表时间
  updated?: string; // 更新时间
}

/**
 * post博客内容接口
 */
export interface PostDataType {
  id?: number;
  bgImgUrl?: string; // 博客相关的封面地址
  title?: string; // 标题
  description?: string; // 描述
  wordAmount?: string; // 字数
  readTime?: string; // 时长
  created?: string; // 发表时间
  updated?: string; // 更新时间
  commentAmount?: number; // 评论数量
  accessAmount?: number; // 访问数量
  content?: string; // 内容
  tags?: TypesAndTagsDataType; // 标签
  types?: TypesAndTagsDataType; // 分类
}

/**
 * 时间线接口例如网站公告、更新日志、博客归档等数据
 */
export interface TimeLineDataType {
  id?: number;
  date?: string;
  content?: string | Array<string>;
}

export interface AdwardInfoDataType {
  id?: number;
  date?: string;
  name?: string;
  amount?: string;
}

/**
 * 分类、标签类型数据
 */
export interface TypesAndTagsDataType {
  id?: number; // id
  name?: string; // 名字
  amount?: number; //数量
}

export type TypesAndTagsData = Array<TypesAndTagsData>;

/**
 * 网站信息数据类型
 */
export interface AppInfoDataType {
  postAmount?: number;
  wordAmount?: number;
  accessAmount?: number;
  updateTime?: string;
}

/**
 * 搜索关键词返回的类型
 */
export interface SearchResultType {
  postId: number;
  title: string;
}

export type PostItemType = {
  _id: string;
  name: string;
  url: string;
  description: string;
  fileName: string;
};
