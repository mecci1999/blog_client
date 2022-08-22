import { Module } from 'vuex';
import { RootState } from '../../index';
import { StringifiableRecord } from 'query-string';
import { PostDataType } from '@/types/interface';
import { queryStringProcess } from '@/utils/queryStringProcess';
import { VITE_POSTS_PER_PAGE } from '@/config';
import { filterProcess } from '@/utils/filterProcess';
import { getPostByIdApi, getPostsApi } from '@/api';

export interface PostStoreState {
  loading: boolean;
  post: PostDataType | null;
  posts: Array<PostDataType>;
  allPosts: Array<PostDataType>;
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
    allPosts: [],
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
      return state.post?.id && state.post?.id === state.allPosts[0].id;
    },

    // 判断当前博客是否为最后一个
    currentIsEndPost(state) {
      const length = state.allPosts.length;

      return state.post?.id && state.post?.id === state.allPosts[length - 1].id;
    },

    // 获取当前博客前一个的博客内容
    getForwardPost(state, getters) {
      // 获取当前博客所在位置
      if (getters.currentIsFirstPost) return;

      const index = state.allPosts.findIndex(
        (item) => item.id === state.post?.id,
      );

      // 拿到前面的博客
      return state.allPosts[index - 1];
    },

    // 获取当前博客后一个的博客内容
    getBackPost(state, getters) {
      // 获取当前博客所在位置
      if (getters.currentIsEndPost) return;

      const index = state.allPosts.findIndex(
        (item) => item.id === state.post?.id,
      );

      // 拿到前面的博客
      return state.allPosts[index + 1];
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

    setAllPosts(state, data) {
      state.allPosts = [...state.allPosts, ...data];
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

    setPrevPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage--;
      }
    },

    setFilter(state, data) {
      const filter = filterProcess(data);

      state.filter = filter;
    },

    clearFilter(state) {
      state.filter = null;
    },

    setQueryString(state, data) {
      state.queryString = data;
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
        const response = await getPostsApi(state.nextPage, query);

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
      commit('setAllPosts', response.data);
      commit('setPosts', response.data);
      commit('setLoading', false);

      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(parseInt(total, 10) / VITE_POSTS_PER_PAGE);

      commit('setTotalPages', totalPages);

      // commit('setNextPage');
    },

    // 根据博客id获取博客
    async getPostById({ commit }, postId) {
      commit('setLoading', true);

      try {
        const response = await getPostByIdApi(postId);
        commit('setLoading', false);
        commit('setPost', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },
  },
};
