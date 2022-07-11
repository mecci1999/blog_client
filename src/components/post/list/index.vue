<script lang="ts">
import { defineComponent } from 'vue';
import PostListItem from './item/inedx.vue';

export default defineComponent({
  name: 'PostList',

  props: {
    posts: {
      type: Array,
    },
  },

  setup() {
    return {};
  },

  components: {
    PostListItem,
  },
});
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.id" :item="post" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
