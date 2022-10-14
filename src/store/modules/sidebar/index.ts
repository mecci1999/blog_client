import { Module } from 'vuex';
import { RootState } from '../../index';

export interface SidebarStoreState {
  sidebarMenuStatus: boolean;
  imageViewerStatus: boolean;
  currentImageIndex: number;
  imageUrlList: Array<string>;
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
    imageViewerStatus: false,
    currentImageIndex: 0,
    imageUrlList: [],
  } as SidebarStoreState,

  /**
   * 获取器
   */
  getters: {
    sidebarMenuStatus(state) {
      return state.sidebarMenuStatus;
    },

    imageViewerStatus(state) {
      return state.imageViewerStatus;
    },

    currentImageIndex(state) {
      return state.currentImageIndex;
    },

    imageUrlList(state) {
      return state.imageUrlList;
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

    openImageViewer(state) {
      state.imageViewerStatus = true;
    },

    closeImageViewer(state) {
      state.imageViewerStatus = false;
    },

    setCurrentImageIndex(state, data) {
      state.currentImageIndex = data;
    },

    setImageUrlList(state, data) {
      state.imageUrlList = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
