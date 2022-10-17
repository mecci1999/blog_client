<script lang="ts" setup>
import CommentList from '@/components/comment/list/index.vue';
import { computed, defineProps } from 'vue';
import { CommentDataType } from '@/types/interface';
import { useStore } from 'vuex';

const props = defineProps({
  comments: {
    type: Array<CommentDataType>,
  },
});

const store = useStore();

// 评论数量
const post = computed(() => store.getters['post/post']);
</script>

<template>
  <div class="comment-show">
    <div class="comment-show-title">
      <span class="comment-show-title-text"
        >共{{ post?.commentAmount }}条评论</span
      >
    </div>
    <div class="comment-show-list">
      <CommentList v-if="post?.commentAmount > 0" :list="comments" />
      <div class="comment-show-list-tip" v-else>快来抢首评~</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
