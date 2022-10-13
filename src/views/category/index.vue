<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import PostIndex from '@/components/post/index/index.vue';
import PostTabBar from '@/components/post/tabs/index.vue';
import AppFooter from '@/components/footer/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AppPagination from '@/components/common/pagination/index.vue';

const routes = useRoute();
const router = useRouter();
const store = useStore();

// 当前页数
const currentPage = computed(() => store.getters['post/nextPage']);

// 总页数
const totalPages = computed(() => store.getters['post/totalPages']);

const postType = computed(() => store.getters['type/types']);

const currentType: any = computed(() => store.getters['type/currentPostType']);
const posts = computed(() => store.getters['post/posts']);
const currentTypeName = computed(
  () => currentType.value && currentType.value.name,
);
const currentPostTypeId = computed(() => {
  currentType.value && currentType.value.id;
});

// 监听currentPage
watch(currentPage, (newValue) => {
  if (newValue) {
    // 获取当前分类的列表
    store.dispatch('post/getPosts', {
      filter: { typeId: routes.params.typeId },
    });
  }
});

// 监听currentTypeId
watch(currentPostTypeId, (newValue: any) => {
  if (newValue) {
    router.replace({ params: { typeId: newValue } });
  }
});

onMounted(() => {
  // 当前分类
  store.commit(
    'type/setCurrentPostType',
    parseInt(`${routes.params.typeId}`, 10),
  );
  /**
   * 获取当前分类
   */
  store.dispatch('type/getPostTypes');

  // 获取当前分类的列表
  store.dispatch('post/getPosts', { filter: { typeId: routes.params.typeId } });
});
</script>

<template>
  <div class="app-category">
    <NavBar />
    <div class="app-category-main">
      <div class="app-category-container">
        <div class="app-category-container-header">
          <PostTabBar :types="postType" />
        </div>
        <div class="app-category-container-index">
          <PostIndex :posts="posts" :title="currentTypeName" />
        </div>
        <AppPagination :currentPage="currentPage" :totalPages="totalPages" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
