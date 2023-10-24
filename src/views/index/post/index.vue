<script lang="ts" setup>
import { getPostList } from '@/api/index';
import {
  onBeforeMount,
  ref,
  reactive,
  onMounted,
  computed,
  nextTick,
  watch,
} from 'vue';
import PostItem from './item.vue';

const postList = ref([]);

onBeforeMount(async () => {
  // 获取公告
  try {
    const post = await getPostList({ pageIndex: 1, pageSize: 5 });
    postList.value = post.data.data;
    console.log(postList.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="app-post">
    <div class="app-post__header">
      <div class="app-post__header-title">作品-开源</div>
      <div v-if="postList.length > 4" class="app-post__header-more">
        <div class="app-post__header-more-text">查看更多</div>
        <div class="app-post__header-more-icon">
          <i></i>
        </div>
      </div>
    </div>
    <div class="app-post__container">
      <PostItem v-for="post in postList.slice(0, 4)" :key="post" :item="post" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
