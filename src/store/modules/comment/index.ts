import { Module } from 'vuex';
import { RootState } from '../../index';
import {
  getCommentsApi,
  getQQUserInfoDev,
  getQQUserInfoPrd,
} from '@/api/index';
import { CommentDataType } from '@/types/interface';
import { VITE_COMMENTS_PER_PAGE } from '@/config';

export interface CommentStoreState {
  qqUserInfo: {
    code: number;
    imgurl: string;
    name: string;
    mail: string;
  };
  comments: Array<CommentDataType>;
  replyComments: Array<CommentDataType>;
  loading: boolean;
  nextPage: number;
  totalPages: number;
  totalCount: number;
}

export interface GetCommentsOptions {
  postId: number;
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    qqUserInfo: {
      code: 0,
      imgurl: '',
      name: '',
      mail: '',
    },
    comments: [],
    replyComments: [],
    loading: false,
    nextPage: 1,
    totalPages: 1,
    totalCount: 1,
  } as CommentStoreState,

  /**
   * 获取器
   */
  getters: {
    qqUserInfo(state) {
      return state.qqUserInfo;
    },

    comments(state) {
      return state.comments;
    },

    replyComments(state) {
      return state.replyComments;
    },

    loading(state) {
      return state.loading;
    },

    totalCount(state) {
      return state.totalCount;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setQQUserInfo(state, data) {
      state.qqUserInfo = data;
    },

    setComments(state, data) {
      state.comments = data;
    },

    setReplyComments(state, data) {
      state.replyComments = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setPrevPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage--;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setTotalCount(state, data) {
      state.totalCount = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getQQUserInfo({ commit }, id: string) {
      try {
        const response = await getQQUserInfoPrd(id);

        commit('setQQUserInfo', response.data);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        throw _error.response;
      }
    },

    /**
     * 获取评论列表
     */
    async getComments(
      { commit, dispatch, state },
      options: GetCommentsOptions,
    ) {
      // 解构数据
      const { postId } = options;

      try {
        const response = await getCommentsApi(postId, state.nextPage);

        dispatch('getCommentsPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 获取评论数据后期处理动作
    getCommentsPostProcess({ commit }, response) {
      commit('setComments', response.data);

      commit('setLoading', false);

      // 从请求头部中获取评论总数量
      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      // 总页数
      const totalPages = Math.ceil(total / VITE_COMMENTS_PER_PAGE);

      commit('setTotalCount', total);
      commit('setTotalPages', totalPages);

      // commit('setNextPage');

      // commit('user/show/setTouchdown', false, { root: true });
    },
  },
};
