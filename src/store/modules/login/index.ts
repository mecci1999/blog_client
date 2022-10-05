import { Module } from 'vuex';
import { RootState } from '../../index';
import { apiHttpClient } from '@/utils/apiHttpClient';

export interface LoginStoreState {
  token: string | null;
}

export const loginStoreModule: Module<LoginStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    token: null,
  } as LoginStoreState,

  /**
   * 获取器
   */
  getters: {
    isLoggedIn(state) {
      return state.token ? true : false;
    },
    token(state) {
      return state.token;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    configApiHttpClientAuthHeader(_, data) {
      apiHttpClient.defaults.headers.common['Authorization'] = `Bearer ${data}`;
    },

    logout({ commit }) {
      commit('setToken', null);
      apiHttpClient.defaults.headers.common['Authorization'] = '';
    },
  },
};
