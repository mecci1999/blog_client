<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostListItem',

  props:{
    item: {
      type: Object,
    }
  },

  setup() {
    return {}
  },

  components: {},
});
</script>

<template>
  <div class="post-list-item">
    <div class="post-list-item-media"></div>
    <div class="post-list-item-content">
      <div class="post-list-item-content-title">{{item.title}}</div>
      <div class="post-list-item-content-data">
        <div class="post-list-item-content-data-time">发表时间:{{item.created}}</div>
        <div class="post-list-item-content-data-comment">评论量:{{item.commentAmount}}</div>
        <div class="post-list-item-content-data-access">阅读量:{{item.accessAmount}}</div>
      </div>
      <div class="post-list-item-content-description">{{item.description}}</div>
      <div class="post-list-item-content-tag"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
