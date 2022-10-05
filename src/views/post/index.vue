<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import NavBar from '@/components/navBar/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import PostShowInfo from '@/components/post/show/info/index.vue';
import PostShowContent from '@/components/post/show/content/index.vue';
import PostShowFooter from '@/components/post/show/footer/index.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CommentPanel from '@/components/comment/index.vue';
import { VITE_APP_CLIENT_BASE_URL } from '@/config';
import AppFooter from '@/components/footer/index.vue';
import PostNavigator from '@/components/post/navigator/index.vue';
export default defineComponent({
  name: 'PostShow',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const link = VITE_APP_CLIENT_BASE_URL + route.path;
    let time = ref('');
    let date: any;

    // 获取当前博客的内容
    store.commit('post/setQueryString', '');
    store.commit('post/setNextPage', 1);
    store.dispatch('post/getPosts');
    store.dispatch('post/getPostById', route.params.postId);
    store.dispatch('comment/getComments', { postId: route.params.postId });

    const post: any = computed(() => store.getters['post/post']);
    const comments: any = computed(() => store.getters['comment/comments']);

    let style = reactive({
      // backgroundImage: `url(${post.bgImgUrl})`,
      backgroundImage: `url(localhost:3000/posts/26/bgImg)`,
    });

    // 点击分类跳转至相关分类页面
    const onClickJumpToType = (id: number) => {
      router.push({ name: 'postCategory', params: { typeId: id } });
    };

    // 点击标签跳转至相关标签页面
    const onClickJumpToTag = (id: number) => {
      router.push({ name: 'postTags', params: { tagId: id } });
    };

    // 挂载时置顶
    onMounted(() => {
      window.scrollTo({ top: 0 });
    });

    return {
      style,
      time,
      post,
      link,
      onClickJumpToType,
      onClickJumpToTag,
      comments,
    };
  },

  components: {
    NavBar,
    UserInfo,
    PostShowInfo,
    PostShowContent,
    PostShowFooter,
    CommentPanel,
    AppFooter,
    PostNavigator,
  },
});
</script>

<template>
  <div class="post-show">
    <NavBar />
    <header class="post-show-header">
      <img class="post-show-header-image" :src="`http://${post?.bgImgUrl}`" />
      <div class="post-show-header-shadow"></div>
      <div class="post-show-header-info">
        <div class="post-show-header-info-option">
          <div
            class="post-show-header-info-option-type"
            v-for="type in post.types"
            :key="type.id"
            @click="onClickJumpToType(type.id)"
          >
            {{ type.name }}
          </div>
          <div
            class="post-show-header-info-option-tag"
            v-for="tag in post.tags"
            :key="tag.id"
            @click="onClickJumpToTag(tag.id)"
          >
            #{{ tag.name }}
          </div>
        </div>
        <h1 class="post-show-header-info-title">{{ post.title }}</h1>
        <PostShowInfo :post="post" />
      </div>
    </header>
    <main class="post-show-main">
      <div class="post-show-main-container">
        <PostShowContent :content="post.content" />
      </div>
      <div class="post-show-main-line"></div>
      <div class="post-show-main-footer">
        <PostShowFooter :link="link" />
      </div>
    </main>
    <CommentPanel :comments="comments" :postId="post.id" />
    <PostNavigator />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
