<script lang="ts" setup>
import { reactive, computed } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import { tags } from '@/api/test/index';
import PostIndex from '@/components/post/index/index.vue';
import { posts } from '@/api/test/index';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const routes = useRoute();
const router = useRouter();
const store = useStore();

// 当前标签id
store.commit('post/setCurrentPostTagId', routes.params.tagId);

const tagItemClasses = (id: any) => [
  'app-tags-container-header-item',
  { selected: id === parseInt(`${currentTagId.value}`, 10) },
];

const currentTagId = computed(() => store.getters['post/currentPostTagId']);

console.log(currentTagId.value);

// 点击切换标签
const onClickChangeTagId = (id: any) => {
  store.commit('post/setCurrentPostTagId', id);
  router.replace({
    name: 'postTags',
    params: { tagId: `${currentTagId.value}` },
  });
};
</script>

<template>
  <div class="app-tags">
    <NavBar />
    <div class="app-tags-container">
      <div class="app-tags-container-header">
        <div
          :class="tagItemClasses(tag.id)"
          v-for="tag in tags"
          :key="tag.id"
          @click.stop="onClickChangeTagId(tag.id)"
        >
          {{ tag.name }}
          <sup class="app-tags-container-header-item-amount">{{
            tag.amount
          }}</sup>
        </div>
      </div>
      <div class="app-tags-container-index">
        <PostIndex :posts="posts" title="设计报告" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
