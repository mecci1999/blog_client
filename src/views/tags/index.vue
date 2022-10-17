<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import PostIndex from '@/components/post/index/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AppFooter from '@/components/footer/index.vue';
import AppPagination from '@/components/common/pagination/index.vue';

const routes = useRoute();
const router = useRouter();
const store = useStore();

// 当前页数
const currentPage = computed(() => store.getters['post/nextPage']);

// 总页数
const totalPages = computed(() => store.getters['post/totalPages']);

// 当前标签
// 获取当前标签的博客列表
store.commit('tag/setCurrentPostTag', parseInt(`${routes.params.tagId}`, 10));

const tags: any = computed(() => store.getters['tag/tags']);

const currentTag = computed(() => store.getters['tag/currentPostTag']);

const currentTagId = computed(() => currentTag.value && currentTag.value.id);
const currentTagName = computed(
  () => currentTag.value && currentTag.value.name,
);
const tagItemClasses = (id: any) => [
  'app-tags-container-header-item',
  {
    selected:
      id ===
      (parseInt(`${currentTagId.value}`, 10) ||
        parseInt(`${routes.params.tagId}`, 10)),
  },
];
const posts = computed(() => store.getters['post/posts']);

// 监听currentTagId
watch(currentTagId, (newValue) => {
  store.dispatch('post/getPosts', { filter: { tagId: newValue } });
  router.replace({ params: { tagId: newValue } });
});

// 点击切换标签
const onClickChangeTagId = (tag: any) => {
  // 将博客标题存储到store中
  store.commit('app/setTitle', tag.name);
  // 根据当前id获取当前标签数据
  store.commit('tag/setCurrentPostTag', tag.id);
};

onMounted(() => {
  // 首先获取相关标签列表
  store.dispatch('tag/getPostTags');

  store.dispatch('post/getPosts', {
    filter: { tagId: parseInt(`${routes.params.tagId}`, 10) },
  });
});
</script>

<template>
  <div class="app-tags">
    <NavBar />
    <div class="app-tags-main">
      <div class="app-tags-container">
        <div class="app-tags-container-header">
          <div
            :class="tagItemClasses(tag.id)"
            v-for="tag in tags"
            :key="tag.id"
            @click.stop="onClickChangeTagId(tag)"
          >
            <span class="app-tags-container-header-item-tip">#</span>
            {{ tag.name }}
            <span class="app-tags-container-header-item-amount">{{
              tag.amount
            }}</span>
          </div>
        </div>
        <div class="app-tags-container-index">
          <PostIndex :posts="posts" :title="currentTagName" />
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
