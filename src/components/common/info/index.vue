<script lang="ts" setup>
import { getAppDays, getCurrentDays } from '@/utils/getAppDays';

const props = defineProps({
  item: {
    type: Object,
  },
});

const time = getCurrentDays();

const days = Math.floor(getAppDays(time));
</script>

<template>
  <div class="app-info">
    <div class="app-info-title">数据</div>
    <div class="app-info-post">
      <div class="app-info-post-title">文章总数：</div>
      <div class="app-info-post-amount">{{ item?.postAmount }}</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">建站天数：</div>
      <div class="app-info-post-amount">{{ days }}</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">总字数：</div>
      <div class="app-info-post-amount">{{ item?.wordAmount }}</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">总访问量：</div>
      <div class="app-info-post-amount">{{ item?.accessAmount }}</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">上次更新时间：</div>
      <div class="app-info-post-amount">{{ item?.updatedTime }}</div>
    </div>
    <div class="app-info-day"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
