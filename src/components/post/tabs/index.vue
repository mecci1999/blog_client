<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import PostTab from './tab/index.vue';
import { TypesAndTagsDataType } from '@/types/interface';

const props = defineProps({
  types: {
    type: Array<TypesAndTagsDataType>,
  },
});

const shadow = ref(false);

const onScrollWindow = () => {
  if (document) {
    const { scrollTop } = document.documentElement;
    shadow.value = scrollTop > 120 ? true : false;
  }
};

onMounted(() => {
  // 监听窗口滚动事件
  if (window) {
    window.addEventListener('scroll', onScrollWindow);
  }
});

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
  }
});
</script>

<template>
  <div :class="['post-tab-bar', { shadow }]">
    <PostTab :tabs="types" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
