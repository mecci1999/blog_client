<script lang="ts" setup>
import CommnetOperation from './operation/index.vue';
import CommentShow from './show/index.vue';
</script>

<template>
  <transition name="comment-panel">
    <div class="comment-panel">
      <CommnetOperation />
      <CommentShow />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
