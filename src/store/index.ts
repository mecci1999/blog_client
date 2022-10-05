import { createStore } from 'vuex';
import { commentStoreModule, CommentStoreState } from './modules/comment';
import { dashboardStoreModule, DashboardStoreState } from './modules/dashboard';
import { loginStoreModule, LoginStoreState } from './modules/login';
import { manageStoreModule, ManageStoreState } from './modules/manage';
import { postStoreModule, PostStoreState } from './modules/post';
import { searchStoreModule, SearchStoreState } from './modules/search';
import { postTagStoreModule, PostTagStoreState } from './modules/tag';
import { themeStoreModule, ThemeStoreState } from './modules/theme';
import { postTypeStoreModule, PostTypeStoreState } from './modules/type';
import { userStoreModule, UserStoreState } from './modules/user';
import { LocalStorageStroePlugin } from './plugins';

export interface RootState {
  appName: string;
  theme: ThemeStoreState;
  user: UserStoreState;
  comment: CommentStoreState;
  post: PostStoreState;
  search: SearchStoreState;
  type: PostTypeStoreState;
  tag: PostTagStoreState;
  dashboard: DashboardStoreState;
  login: LoginStoreState;
  manage: ManageStoreState;
}

/**
 * 创建store
 */
const store = createStore({
  state: {
    appName: 'Darwin',
  } as RootState,

  modules: {
    theme: themeStoreModule,
    user: userStoreModule,
    comment: commentStoreModule,
    post: postStoreModule,
    search: searchStoreModule,
    type: postTypeStoreModule,
    tag: postTagStoreModule,
    dashboard: dashboardStoreModule,
    login: loginStoreModule,
    manage: manageStoreModule,
  },

  // 插件
  plugins: [LocalStorageStroePlugin],
});

/**
 * 默认导出
 */
export default store;
