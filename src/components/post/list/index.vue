<script lang="ts" setup>
import { computed, defineProps,watch } from 'vue';
import PostListItem from './item/inedx.vue';
import AppPagination from '@/components/common/pagination/index.vue';
import { PostDataType } from '@/types/interface'
import store from '@/store';

  const props = defineProps({
    posts: {
      type: Array<PostDataType>,
    },
  })

  const totalPages = computed(() => store.state.post.totalPages);

  const currentPage = computed(() => store.state.post.nextPage);

  // 监听currentPage
  watch(currentPage,(newValue) => {
    store.dispatch('post/getPosts');
  })

  // 提示相关文案
  const commentTipText = computed(() => props.posts?.length !== 0 ? '已经到底啦~' : '抱歉，没有找到相关内容~')
</script>

<template>
  <div class="post-list">
    <div class="post-list-container" v-if="posts && posts.length > 0">
      <div class="post-list-group">
        <PostListItem v-for="post in posts" :key="post.id" :item="post" />
      </div>
      <div
        class="post-list-bottom-tip"
        v-if="posts?.length && posts?.length < 12"
      >
        <span class="post-list-bottom-tip-text">{{ commentTipText }}</span>
      </div>
      <AppPagination :currentPage="currentPage" :totalPages="totalPages" />
    </div>
    <div class="post-list-empty" v-else>抱歉，没有找到相关内容</div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
