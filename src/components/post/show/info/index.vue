<script lang="ts" setup>
import { defineProps } from 'vue';
import { time } from '@/utils/time';

const props = defineProps({
  post: {
    type: Object,
  },
});
</script>

<template>
  <div class="post-show-info">
    <!-- <div class="post-show-info-option"></div> -->
    <!-- <div class="post-show-info-item"> -->
    <div class="post-show-info-created">
      <i class="post-show-info-created-icon"></i>
      <span class="post-show-info-created-text"
        ><span class="post-show-info__mobile">发布日期：</span>
        {{ time(post?.created) }}</span
      >
    </div>
    <div class="post-show-info-updated">
      <i class="post-show-info-updated-icon"></i>
      <span class="post-show-info-updated-text"
        ><span class="post-show-info__mobile">更新日期：</span>
        {{ time(post?.updated) }}</span
      >
    </div>
    <div class="post-show-info-word">
      <i class="post-show-info-word-icon"></i>
      <span class="post-show-info-word-text"
        ><span class="post-show-info__mobile">文章字数：</span>
        {{ post?.wordAmount }}</span
      >
    </div>
    <div class="post-show-info-read">
      <i class="post-show-info-read-icon"></i>
      <span class="post-show-info-read-text"
        ><span class="post-show-info__mobile">阅读时长：</span>
        {{ post?.readTime }}</span
      >
    </div>
    <div class="post-show-info-access">
      <i class="post-show-info-access-icon"></i>
      <span class="post-show-info-access-text">
        <span class="post-show-info__mobile">访问量：</span>
        {{ post?.accessAmount }}</span
      >
    </div>
    <div class="post-show-info-comment">
      <i class="post-show-info-comment-icon"></i>
      <span class="post-show-info-comment-text">
        <span class="post-show-info__mobile">评论量：</span>
        {{ post?.commentAmount }}</span
      >
    </div>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
