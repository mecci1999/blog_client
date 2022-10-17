<script lang="ts" setup>
import { getAppDays, getCurrentDays } from '@/utils/getAppDays';
import { useStore } from 'vuex';
import { computed, watch } from 'vue';

const store = useStore();
const theme = computed(() => store.getters['theme/theme']);

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
        <router-link :to="{ name: 'privacy' }">隐私政策</router-link>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >赣ICP备2022008398号</a
        >
      </div>
      <router-link class="app-footer-info-cc" :to="{ name: 'copyright' }">
        <i
          :class="['app-footer-info-copyright', { dark: theme === 'dark' }]"
        ></i>
        <i :class="['app-footer-info-person', { dark: theme === 'dark' }]"></i>
      </router-link>
      <div class="app-footer-info-record"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
