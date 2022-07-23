<script lang="ts" setup>
import CommentList from '@/components/comment/list/index.vue';
import { comment } from '@/api/test/index';
</script>

<template>
  <div class="comment-show">
    <div class="comment-show-title">
      <span class="comment-show-title-text">共10条评论</span>
    </div>
    <div class="comment-show-list">
      <CommentList :list="comment" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
