<script lang="ts" setup>
import CommnetOperation from './operation/index.vue';
import CommentShow from './show/index.vue';
import { defineProps } from 'vue';
import { CommentDataType } from '@/types/interface';

const props = defineProps({
  comments: {
    type: Array<CommentDataType>,
  },
  postId: {
    type: Number,
  },
});
</script>

<template>
  <transition name="comment-panel">
    <div class="comment-panel">
      <div class="comment-panel_container">
        <CommnetOperation :postId="postId" />
        <CommentShow :comments="comments" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
