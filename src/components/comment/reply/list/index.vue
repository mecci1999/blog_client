<script lang="ts" setup>
import { defineProps } from 'vue';
import CommentReplyListItem from './item/index.vue';
import { CommentDataType } from '@/types/interface';

// 属性
const props = defineProps({
  list: {
    type: Array<CommentDataType>,
  },

  parentName: {
    type: String,
  },
});
</script>

<template>
  <div class="comment-reply-list">
    <CommentReplyListItem
      v-for="item in list"
      :key="item.id"
      :item="item"
      :parentName="parentName"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
