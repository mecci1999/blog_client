<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import PostShowInfo from '@/components/post/show/info/index.vue';
import PostShowContent from '@/components/post/show/content/index.vue';
import PostShowFooter from '@/components/post/show/footer/index.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CommentPanel from '@/components/comment/index.vue';
import { VITE_APP_CLIENT_BASE_URL } from '@/config';
import AppFooter from '@/components/footer/index.vue';
import PostNavigator from '@/components/post/navigator/index.vue';
import { API_BASE_URL } from '@/config';
import PostHepler from '@/components/post/helper/index.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const link = VITE_APP_CLIENT_BASE_URL() + route.path;
let time = ref('');
let date: any;
const containerHeight = ref(0);
// const bottomHeight = ref(0);

const ShowMain = ref(null) as any;

// 获取当前博客的内容
store.commit('post/setQueryString', '');
store.commit('post/setNextPage', 1);
// 获取ip地址
store.dispatch('app/getIpAddressAction');
store.dispatch('app/getRealAddressAction');
store.dispatch('post/getPosts');
store.dispatch('post/getPostById', route.params.postId);
store.dispatch('comment/getComments', { postId: route.params.postId });

const post: any = computed(() => store.getters['post/post']);
const comments: any = computed(() => store.getters['comment/comments']);

let style = reactive({
  backgroundImage: `url(${post.bgImgUrl})`,
});

// 点击分类跳转至相关分类页面
const onClickJumpToType = (type: any) => {
  // 将博客标题存储到store中
  store.commit('app/setTitle', type.name);
  router.push({ name: 'postCategory', params: { typeId: type.id } });
};

// 点击标签跳转至相关标签页面
const onClickJumpToTag = (tag: any) => {
  // 将博客标题存储到store中
  store.commit('app/setTitle', tag.name);
  router.push({ name: 'postTags', params: { tagId: tag.id } });
};

watch(post, (val) => {
  if (val) {
    window.scrollTo({ top: 0 });
  }
});

watch(
  () => ShowMain.value,
  (val) => {
    if (val.scrollHeight) {
      containerHeight.value = ShowMain.value.scrollHeight;
    }
  },
);

// 挂载时置顶
onMounted(() => {
  window.scrollTo({ top: 0 });
});
</script>

<template>
  <div class="post-show">
    <NavBar />
    <header class="post-show-header">
      <img
        class="post-show-header-image"
        :src="
          API_BASE_URL() === 'http://localhost:3000'
            ? `http://${post?.bgImgUrl}`
            : `https://${post?.bgImgUrl}`
        "
      />
      <div class="post-show-header-shadow"></div>
      <div class="post-show-header-blur"></div>
      <div class="post-show-header-info">
        <div class="post-show-header-info-option">
          <div
            class="post-show-header-info-option-type"
            v-for="type in post?.types"
            :key="type.id"
            @click="onClickJumpToType(type)"
          >
            {{ type?.name }}
          </div>
          <div
            class="post-show-header-info-option-tag"
            v-for="tag in post?.tags"
            :key="tag.id"
            @click="onClickJumpToTag(tag)"
          >
            #{{ tag?.name }}
          </div>
        </div>
        <h1 class="post-show-header-info-title">{{ post?.title }}</h1>
        <PostShowInfo :post="post" />
      </div>
    </header>
    <main class="post-show-main">
      <div class="post-show-main-container" ref="ShowMain">
        <PostShowContent :content="post?.content" />
      </div>
      <div class="post-show-main-line"></div>
      <div class="post-show-main-footer">
        <PostShowFooter :link="link" :post="post" />
      </div>
    </main>
    <CommentPanel :comments="comments" :postId="post?.id" />
    <PostHepler :headerHeight="containerHeight" />
    <PostNavigator />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
