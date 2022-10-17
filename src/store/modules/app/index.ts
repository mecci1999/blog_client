import { Module } from 'vuex';
import { RootState } from '../../index';

export interface AppStoreState {
  title: string;
  loading: boolean; // 请求加载
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
    loading: false,
  } as AppStoreState,

  /**
   * 获取器
   */
  getters: {
    title(state) {
      return state.title;
    },
    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTitle(state, data) {
      state.title = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
