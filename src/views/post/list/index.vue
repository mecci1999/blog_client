<script lang="ts" setup>
import NavBar from '@/components/navBar/index.vue';
import AppFooter from '@/components/footer/index.vue';
import PostIndex from '@/components/post/index/index.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import AppPagination from '@/components/common/pagination/index.vue';

const store = useStore();

// 当前页数
const currentPage = computed(() => store.getters['post/nextPage']);
// 总数
const totalCount = computed(() => store.getters['post/totalCount']);

// 监听currentPage
watch(currentPage, (newValue) => {
  if (newValue) {
    store.dispatch('post/getPosts');
  }
});

// 总页数
const totalPages = computed(() => store.getters['post/totalPages']);

// const posts = ref([]);
const posts = computed(() => store.getters['post/posts']);

// watch(
//   () => curPage.value,
//   async (val) => {
//     if (val) {
//       const response = await getPostsApi(val);
//       posts.value = response.data;
//       totalCount.value = parseInt(
//         `${
//           response.headers['X-Total-Count'] || response.headers['x-total-count']
//         }`,
//         10,
//       );
//       totalPages.value = Math.ceil(totalCount.value / 10);
//     }
//   },
//   {
//     immediate: false,
//   },
// );

onMounted(async () => {
  store.dispatch('post/getPosts');
  // const response = await getPostsApi(curPage.value);
  // posts.value = response.data;
  // totalCount.value = parseInt(
  //   `${response.headers['X-Total-Count'] || response.headers['x-total-count']}`,
  //   10,
  // );
  // totalPages.value = Math.ceil(totalCount.value / 10);
});
</script>

<template>
  <div class="post-article">
    <NavBar />
    <div class="post-article-container">
      <PostIndex :posts="posts" title="文章 - " :amount="totalCount" />
    </div>
    <AppPagination :currentPage="currentPage" :totalPages="totalPages" />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
