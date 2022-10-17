import { Module } from 'vuex';
import { RootState } from '../../index';

export interface AppStoreState {
  title: string;
}

export const appStoreModule: Module<AppStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    title: '',
  } as AppStoreState,

  /**
   * 获取器
   */
  getters: {
    title(state) {
      return state.title;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTitle(state, data) {
      state.title = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
