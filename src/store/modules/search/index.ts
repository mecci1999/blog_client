import { Module } from 'vuex';
import { RootState } from '../../index';

export interface SearchStoreState {
  openSearchDialog: boolean;
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
    openSearchDialog: false,
  } as SearchStoreState,

  /**
   * 获取器
   */
  getters: {
    openSearchDialog(state) {
      return state.openSearchDialog;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    changeSearchDialogStatus(state, data) {
      state.openSearchDialog = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
