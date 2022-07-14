<script lang="ts" setup>
const props = defineProps({
  tags: {
    type: Array,
  },
});
</script>

<template>
  <div class="tags-list">
    <div class="tags-list-title">标签</div>
    <div class="tags-list-item" v-for="tag in tags" :key="tag?.id">
      #{{ tag?.name }}
      <sup class="tags-list-item-amount">{{ tag?.amount }}</sup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
