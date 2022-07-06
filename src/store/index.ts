import { createStore } from 'vuex';
import { commentStoreModule, CommentStoreState } from './modules/comment';
import { themeStoreModule, ThemeStoreState } from './modules/theme';
import { userStoreModule, UserStoreState } from './modules/user';
import { LocalStorageStroePlugin } from './plugins';

export interface RootState {
  appName: string;
  theme: ThemeStoreState;
  user: UserStoreState;
  comment: CommentStoreState;
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
    comment: commentStoreModule,
  },

  // 插件
  plugins: [LocalStorageStroePlugin],
});

/**
 * 默认导出
 */
export default store;
