import { createStore } from 'vuex';
import { themeStoreModule, ThemeStoreState } from './modules/theme';
import { userStoreModule, UserStoreState } from './modules/user';
import { LocalStorageStroePlugin } from './plugins';

export interface RootState {
  appName: string;
  theme: ThemeStoreState;
  user: UserStoreState;
}

/**
 * 创建store
 */
const store = createStore({
  state: {
    appName: 'Mecci',
  } as RootState,

  modules: {
    theme: themeStoreModule,
    user: userStoreModule,
  },

  // 插件
  plugins: [LocalStorageStroePlugin],
});

/**
 * 默认导出
 */
export default store;
