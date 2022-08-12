<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import PostListItem from './item/inedx.vue';
import { PostDataType } from '@/types/interface'

  const props = defineProps({
    posts: {
      type: Array<PostDataType>,
    },
  })

  // 提示相关文案
  const commentTipText = computed(() => props.posts?.length !== 0 ? '已经到底啦~' : '抱歉，没有找到相关内容~')
</script>

<template>
  <div class="post-list">
    <div class="post-list-group">
      <PostListItem v-for="post in posts" :key="post.id" :item="post" />
    </div>
    <div class="post-list-bottom-tip">
      <span class="post-list-bottom-tip-text">{{ commentTipText }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
