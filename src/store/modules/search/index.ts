import { Module } from 'vuex';
import { RootState } from '../../index';

export interface SearchStoreState {
  searchDialogStatus: boolean;
}

export const searchStoreModule: Module<SearchStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    searchDialogStatus: false,
  } as SearchStoreState,

  /**
   * 获取器
   */
  getters: {
    searchDialogStatus: (state) => state.searchDialogStatus,
  },

  /**
   * 修改器
   */
  mutations: {
    openSearchDialog: async (state) => {
      state.searchDialogStatus = true;
    },

    closeSearchDialog: async (state) => {
      state.searchDialogStatus = false;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
