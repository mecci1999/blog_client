<script lang="ts" setup>
import { defineProps } from 'vue';
import PostTab from './tab/index.vue';

const props = defineProps({
  type: {
    type: Array,
  },
});
</script>

<template>
  <div class="post-tab-bar">
    <PostTab :tabs="type" />
    <div class="post-tab-bar-more">更多</div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
