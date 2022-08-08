import { getTypesApi } from '@/api';
import { postType } from '@/api/test';
import { TypesAndTagsDataType } from '@/types/interface';
import { Module } from 'vuex';
import { RootState } from '../../index';

export interface PostTypeStoreState {
  loading: boolean;
  types: Array<TypesAndTagsDataType>;
  currentPostType: TypesAndTagsDataType | null;
}

export const postTypeStoreModule: Module<PostTypeStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    types: [],
    currentPostType: null,
  } as PostTypeStoreState,

  /**
   * 获取器
   */
  getters: {
    types(state) {
      return state.types;
    },

    loading(state) {
      return state.loading;
    },

    // 获取当前分类
    currentPostType(state) {
      return state.currentPostType;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTypes(state, data) {
      state.types = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    setCurrentPostType(state, id: number) {
      let type: any;
      if (state.types.length !== 0) {
        type = state.types.find((item) => item.id === id);
      } else {
        type = postType.find((item) => item.id === id);
      }
      if (id === 0) {
        type = null;
      }
      state.currentPostType = type;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getPostTypes({ commit }) {
      commit('setLoading', true);

      try {
        const response = await getTypesApi();

        commit('setTypes', response.data);

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
