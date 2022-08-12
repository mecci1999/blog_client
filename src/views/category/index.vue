<script lang="ts" setup>
import { computed, watch } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import PostIndex from '@/components/post/index/index.vue';
import PostTabBar from '@/components/post/tabs/index.vue';
import AppFooter from '@/components/footer/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const routes = useRoute();
const router = useRouter();
const store = useStore();

/**
 * 获取当前分类
 */
store.dispatch('type/getPostTypes');

const postType = computed(() => store.getters['type/types']);

// 当前分类
store.commit(
  'type/setCurrentPostType',
  parseInt(`${routes.params.typeId}`, 10),
);

const currentType: any = computed(() => store.getters['type/currentPostType']);
const posts = computed(() => store.getters['post/posts']);
const currentTypeName = computed(
  () => currentType.value && currentType.value.name,
);
const currentPostTypeId = computed(() => {
  currentType.value && currentType.value.id;
});

// 监听currentTypeId
watch(currentPostTypeId, (newValue: any) => {
  router.replace({ params: { typeId: newValue } });
});
</script>

<template>
  <div class="app-category">
    <NavBar />
    <div class="app-category-container">
      <div class="app-category-container-header">
        <PostTabBar :types="postType" />
      </div>
      <div class="app-category-container-index">
        <PostIndex :posts="posts" :title="currentTypeName" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
