<script lang="ts" setup>
import {
  onBeforeMount,
  ref,
  reactive,
  onMounted,
  computed,
  nextTick,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/views/index/header/index.vue';
import AppBanner from '@/views/index/banner/index.vue';
import AppPost from '@/views/index/post/index.vue';

const store = useStore();

onBeforeMount(async () => {
  // 获取公告
  store.commit('app/setLoading', true);
  try {
  } catch (error) {
    console.log(error);
    store.commit('app/setLoading', false);
  }

  store.commit('app/setLoading', false);
});
</script>

<template>
  <div class="app-home">
    <AppHeader />
    <AppBanner />
    <AppPost />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
