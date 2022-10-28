import { getIpAddressBySohuApi } from '@/api';
import { apiHttpClient } from '@/utils/apiHttpClient';
import { getSessionStroage, setSessionStroage } from '@/utils/localStorage';
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
  actions: {
    // 获取IP地址动作
    async getIpAddressAction() {
      // 发送一条sohu请求得到IP地址，存储到Session中，并封装到请求头部中
      const ip = getSessionStroage('ip');
      if (ip) {
        // 封装到请求头部中
        apiHttpClient.defaults.headers.common['Ip'] = `${ip}`;
      } else {
        try {
          const res = await getIpAddressBySohuApi();

          const object = res.data.split('=')[1].trim().slice(0, -1);

          const { cip } = JSON.parse(object);

          // 存储到sessionStorage中
          setSessionStroage('ip', cip);

          // 封装到请求头部中
          apiHttpClient.defaults.headers.common['Ip'] = `${cip}`;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
