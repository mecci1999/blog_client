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
});
</script>

<template>
  <div class="comment-reply">
    <CommentReplyList :list="reply" :parentName="parentName" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
