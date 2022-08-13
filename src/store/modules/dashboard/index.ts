import { Module } from 'vuex';
import { RootState } from '../../index';
import { AppInfoDataType } from '@/types/interface';
import { getAppInfoApi } from '@/api';

export interface DashboardStoreState {
  loading: boolean;
  info: AppInfoDataType | null;
}

export const dashboardStoreModule: Module<DashboardStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    info: null,
  } as DashboardStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    appInfo(state) {
      return state.info;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setAppInfo(state, data) {
      state.info = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getAppInfo({ commit }) {
      commit('setLoading', true);

      try {
        const response = await getAppInfoApi();
        commit('setAppInfo', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        commit('setLoading', false);

        throw _error.response;
      }
    },
  },
};
