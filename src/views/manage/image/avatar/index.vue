<template>
  <div class="app-management__image-common">头像管理</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const store = useStore();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.image.avatar',
    title: '头像管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
