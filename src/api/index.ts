/**
 * 项目所有的接口api方法
 */
import { apiHttpClient, tenApiHttpRequest } from '../utils/apiHttpClient';

/**
 * 获取博主信息接口
 * @returns
 */
export const getUserInfo = async () => {
  return await apiHttpClient.get('user');
};

/**
 * 获取用户的QQ头像以及昵称，使用的他人的api接口，注意是否会挂掉的问题
 */
export const getQQUserInfo = async (id: string) => {
  return await tenApiHttpRequest.get(`qqname/?qq=${id}`);
};
