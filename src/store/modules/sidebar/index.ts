import { Module } from 'vuex';
import { RootState } from '../../index';

export interface SidebarStoreState {
  sidebarMenuStatus: boolean;
}

export const sidebarStoreModule: Module<SidebarStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    sidebarMenuStatus: false,
  } as SidebarStoreState,

  /**
   * 获取器
   */
  getters: {
    sidebarMenuStatus(state) {
      return state.sidebarMenuStatus;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    openSidebarMenu(state) {
      state.sidebarMenuStatus = true;
    },

    closeSidebarMenu(state) {
      state.sidebarMenuStatus = false;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
