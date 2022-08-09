import { getTagsApi } from '@/api';
// import { postType } from '@/api/test';
import { TypesAndTagsDataType } from '@/types/interface';
import { Module } from 'vuex';
import { RootState } from '../../index';

export interface PostTagStoreState {
  loading: boolean;
  tags: Array<TypesAndTagsDataType>;
  currentPostTag: TypesAndTagsDataType | null;
}

export const postTagStoreModule: Module<PostTagStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    tags: [],
    currentPostTag: null,
  } as PostTagStoreState,

  /**
   * 获取器
   */
  getters: {
    tags(state) {
      return state.tags;
    },

    loading(state){
      return state.loading;
    },

    // 获取当前分类
    currentPostTag(state) {
      return state.currentPostTag;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTags(state, data) {
      state.tags = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    setCurrentPostTag(state, id: number) {
      let tag: any;
      tag = state.tags.find((item) => item.id === id);
      if (id === 0) {
        tag = null;
      }
      state.currentPostTag = tag;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getPostTags({ commit }) {
      commit('setLoading', true);

      try {
        const response = await getTagsApi();

        commit('setTags', response.data);

        commit('setLoading', false);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        commit('setLoading', false);
        throw _error.response;
      }
    },
  },
};
