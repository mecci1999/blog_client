<script lang="ts" setup>
import { getAppDays, getCurrentDays } from '@/utils/getAppDays';

// 当前年份
const year = new Date().getFullYear();

const time = getCurrentDays();

const days = Math.floor(getAppDays(time));
</script>

<template>
  <div class="app-footer">
    <div class="app-footer-link"></div>
    <div class="app-footer-info">
      <div class="app-footer-info-time">
        本站已经安全的运行了<b>{{ days }}</b
        >天
      </div>
      <div class="app-footer-info-text">&copy 2022 - {{ year }} By Darwin</div>
      <div class="app-footer-info__banner">
        <router-link :to="{ name: 'about' }">关于</router-link>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >赣ICP备2022008398号</a
        >
      </div>
      <div class="app-footer-info-record"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
