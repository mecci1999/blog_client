import { Module } from 'vuex';
import { RootState } from '../../index';

export interface TabOption {
  title: string; // 标题
  name: string; // 路由名
}

export interface ManageStoreState {
  isExpand: Boolean; // 是否展开菜单
  tabs: Array<TabOption>; // 标签页
  currentTab: string; // 当前标签名
}

export const manageStoreModule: Module<ManageStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    isExpand: false,
    tabs: [],
    currentTab: 'manage.blog.list',
  } as ManageStoreState,

  /**
   * 获取器
   */
  getters: {
    isExpand(state) {
      return state.isExpand;
    },

    tabs(state) {
      return state.tabs;
    },

    currentTab(state) {
      return state.currentTab;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setIsExpand(state, data) {
      state.isExpand = data;
    },

    // 添加tab
    addTab(state, tab) {
      // 判断tab是否已存在
      if (state.tabs.findIndex((item) => item.name === tab.name) !== -1) return;
      state.tabs.push(tab);
    },

    // 移除tab
    removeTab(state, name) {
      // 索引
      const index = state.tabs.findIndex((item) => item.name === name);

      // 如果tabs只剩一个值，则向列表中插入一条博客列表的tab，并设置当前tab为博客列表
      if (state.tabs.length === 1) {
        // 过滤
        state.tabs = [];

        state.tabs.push({
          name: 'manage.blog.list',
          title: '博客列表',
        });

        state.currentTab = 'manage.blog.list';
      } else {
        // 如果移除的为最右边的tab, 则当前的tab为删除的tab左边一个
        if (index + 1 === state.tabs.length) {
          state.currentTab = state.tabs[index - 1].name;
        } else {
          state.currentTab = state.tabs[index + 1].name;
        }
        state.tabs.splice(index, 1);
      }
    },

    setCurrentTab(state, data) {
      state.currentTab = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
