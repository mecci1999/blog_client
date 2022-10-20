<template>
  <div class="app-management__account">账号管理</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const store = useStore();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.account',
    title: '账号管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
