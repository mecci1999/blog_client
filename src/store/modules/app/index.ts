import { watch } from 'vue';
import { apiHttpClient } from '@/utils/apiHttpClient';
import { getSessionStroage, setSessionStroage } from '@/utils/localStorage';
import { Module } from 'vuex';
import { RootState } from '../../index';
import { jsonp } from '@/utils/jsonp';

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
    getIpAddressAction() {
      // 发送一条sohu请求得到IP地址，存储到Session中，并封装到请求头部中
      const ip = getSessionStroage('ip');
      if (ip) {
        // 封装到请求头部中
        apiHttpClient.defaults.headers.common['Ip'] = `${ip}`;
      } else {
        try {
          const api = 'https://pv.sohu.com/cityjson';

          jsonp({
            url: api,
            callback: (res: any) => {},
          });

          watch(
            () => window,
            (value: any) => {
              if (value && value.returnCitySN) {
                setSessionStroage('ip', value.returnCitySN.cip);
                // 封装到请求头部中
                apiHttpClient.defaults.headers.common['Ip'] = `${ip}`;
              }
            },
            {
              immediate: true,
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    // 获取真实地址
    getRealAddressAction() {
      // 发送百度地图API请求获取真实地址，存储到Session中
      const address = getSessionStroage('address');
      const ip = getSessionStroage('ip');
      if (!address) {
        try {
          const api = 'https://api.map.baidu.com/location/ip';

          jsonp({
            url: api,
            data: {
              ak: 'N8aHMjLP374THnPfPyB89BPKK7TImh2z',
              ip: ip,
              coor: 'bd09ll',
            },
            callback: (res: any) => {
              // 存储到sessionStorage中
              setSessionStroage('address', {
                province: res.content.address_detail.province,
                city: res.content.address_detail.city,
              });
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
