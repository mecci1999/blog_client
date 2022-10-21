<script lang="ts" setup>
import { getAppDays, getCurrentDays } from '@/utils/getAppDays';
import { time } from '@/utils/time';

const props = defineProps({
  item: {
    type: Object,
  },
});

const day = getCurrentDays();

const days = Math.floor(getAppDays(day));
</script>

<template>
  <div class="app-info">
    <div class="app-info-title">数据</div>
    <div class="app-info-post">
      <div class="app-info-post-title">文章总数：</div>
      <div class="app-info-post-amount">{{ item?.postAmount }}篇</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">建站天数：</div>
      <div class="app-info-post-amount">{{ days }}天</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">总字数：</div>
      <div class="app-info-post-amount">{{ item?.wordAmount }}</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">总访问量：</div>
      <div class="app-info-post-amount">{{ item?.accessAmount }}次</div>
    </div>
    <div class="app-info-post">
      <div class="app-info-post-title">上次更新时间：</div>
      <div class="app-info-post-amount">{{ time(item?.updateTime) }}</div>
    </div>
    <div class="app-info-day"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
