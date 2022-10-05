<template>
  <div class="app-management__blog-tags">标签管理</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.tags',
    title: '标签管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
