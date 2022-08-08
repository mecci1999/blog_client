import { Module } from 'vuex';
import { RootState } from '../../index';
import { StringifiableRecord } from 'query-string';
import { PostDataType, TypesAndTagsDataType } from '@/types/interface';
import { apiHttpClient } from '@/utils/apiHttpClient';
import { queryStringProcess } from '@/utils/queryStringProcess';
import { POSTS_PER_PAGE } from '@/config';

export interface PostStoreState {
  loading: boolean;
  post: PostDataType | null;
  posts: Array<PostDataType>;
  nextPage: number;
  totalPages: number;
  queryString: string;
  filter: { [name: string]: string } | null;
}

export interface GetPostsOptions {
  sort?: string;
  filter?: { [name: string]: string };
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    post: null,
    posts: [],
    nextPage: 1,
    totalPages: 1,
    queryString: '',
    filter: null,
  } as PostStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    // 当前内容展示的博客
    post(state) {
      return state.post;
    },

    posts(state) {
      return state.posts;
    },

    // 判断当前博客是否为第一个
    currentIsFirstPost(state) {
      return state.post?.id && state.post?.id === state.posts[0].id;
    },

    // 判断当前博客是否为最后一个
    currentIsEndPost(state) {
      const length = state.posts.length;

      return state.post?.id && state.post?.id === state.posts[length - 1].id;
    },

    // 获取当前博客前一个的博客内容
    getForwardPost(state, getters) {
      // 获取当前博客所在位置
      if (getters.currentIsFirstPost) return;

      const index = state.posts.findIndex((item) => item.id === state.post?.id);

      // 拿到前面的博客
      return state.posts[index - 1];
    },

    // 获取当前博客后一个的博客内容
    getBackPost(state, getters) {
      // 获取当前博客所在位置
      if (getters.currentIsEndPost) return;

      const index = state.posts.findIndex((item) => item.id === state.post?.id);

      // 拿到前面的博客
      return state.posts[index + 1];
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPost(state, data) {
      state.post = data;
    },

    setPosts(state, data) {
      state.posts = data;
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },
  },

  /**
   * 动作
   */
  actions: {
    // 获取
    async getPosts({ commit, dispatch, state }, options: GetPostsOptions = {}) {
      let getPostsQueryString = '';

      // 进行判断，参数是否为空对象时，做出相应的处理
      if (Object.keys(options).length) {
        getPostsQueryString = await dispatch('getPostsPreProcess', options);
      } else {
        getPostsQueryString = state.queryString;
      }

      const query = getPostsQueryString ? `&${getPostsQueryString}` : '';

      try {
        const response = await apiHttpClient.get(
          `/posts?page=${state.nextPage}${query}`,
        );

        dispatch('getPostsPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        commit('setLoading', false);
        throw _error.response;
      }
    },

    getPostsPreProcess({ commit, state }, options: GetPostsOptions) {
      commit('setLoading', true);
      commit('setFilter', options.filter);

      const { sort } = options;

      const getPostsQueryObject: StringifiableRecord = {
        sort,
        ...state.filter,
      };

      const getPostsQueryString = queryStringProcess(getPostsQueryObject);

      if (state.queryString !== getPostsQueryString) {
        commit('setNextPage', 1);
      }

      commit('setQueryString', getPostsQueryString);

      return getPostsQueryString;
    },

    getPostsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setPosts', response.data);
      } else {
        commit('setPosts', [...state.posts, ...response.data]);
      }

      commit('setLoading', false);

      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(total / POSTS_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');
    },
  },
};
