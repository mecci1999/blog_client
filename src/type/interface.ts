/**
 * 此文件下都是各种数据的类型定义接口
 */
import { CommentStatus } from './enum';

export interface CommentDataType {
  id?: number; //ID
  avatarImgUrl?: string; // 头像地址
  name?: string; // 评论作者
  email?: string; // 邮箱地址
  cotent?: string; // 内容
  postId?: number; // 博客id
  parentId?: number | null; // 父级评论Id
  os?: string; // 操作系统类型
  browser?: string; //浏览器类型
  address?: string; // 所在省份
  status?: CommentStatus; // 评论状态
  created?: string; // 发表时间
  updated?: string; // 更新时间
}
