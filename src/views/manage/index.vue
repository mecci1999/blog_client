<template>
  <div :class="['app-management', { expand: !isExpand }]">
    <div class="app-management__aside">
      <AppMenu />
    </div>
    <div class="app-management__main">
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from '@/components/layout/menu/index.vue';
import AppMain from '@/components/layout/main/index.vue';
import { useStore } from 'vuex';
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// 是否展开菜单
const isExpand = computed(() => store.getters['manage/isExpand']);

const currentTab = computed(() => store.getters['manage/currentTab']);

watch(
  () => currentTab.value,
  (val) => {
    router.push({ name: val });
  },
);

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.list',
    title: '博客列表',
  };

  store.commit('manage/addTab', tab);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
