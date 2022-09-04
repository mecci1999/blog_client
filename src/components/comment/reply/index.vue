<script lang="ts" setup>
import { defineProps } from 'vue';
import CommentReplyList from './list/index.vue';
import { CommentDataType } from '@/types/interface';

const props = defineProps({
  reply: {
    type: Array<CommentDataType>,
  },
  parentName: {
    type: String,
  },

  showMoreComment: {
    type: Boolean,
    default: false,
  },

  handleFoldMore: {
    type: Function,
  },
});
</script>

<template>
  <div class="comment-reply">
    <CommentReplyList
      :list="reply"
      :parentName="parentName"
      :showMoreComment="showMoreComment"
      :handleFoldMore="handleFoldMore"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
